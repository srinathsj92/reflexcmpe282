
var Q = require('q');
var ldap = require('ldapjs');



module.exports = function(webSettings) {

    var dnFilter = 'ou=People,o=Intra,dc=sears,dc=com';

    if(!webSettings || !webSettings.ldapAddress) {
        throw new Error('LDAP address must be specified.');
    }

    function LDAPServ() {
    }

    LDAPServ.prototype = {

        authenticateUser: function (userId, password) {

            var deferred = Q.defer();
            var ldapClient = ldap.createClient({
                url: webSettings.ldapAddress
            });
            var ldapOptions = {
                scope: 'sub'
            };
            var ldapQuery = ['uid=', userId, ',', dnFilter].join("");
            var rejectAuthentication = function() {
                deferred.reject({
                    message: "Invalid user name or password."
                });
            };
            var lookupResult;

            ldapClient.search(ldapQuery, ldapOptions, function (err, result) {
                result.on('searchEntry', function (entry) {
                    lookupResult = entry.object;
                });
                result.on('end', function (result) {
                    if (lookupResult) {
                        ldapClient.bind(lookupResult.dn, password, function (err) {
                            if (err) {
                                rejectAuthentication();
                            }
                            else {

                                deferred.resolve({
                                    userId: lookupResult.uid,
                                    userName: lookupResult.givenName,
                                    fullName: lookupResult.givenName + ' ' + lookupResult.sn,
                                    email:lookupResult.mail
                                });
                                solarCollection.getAllSolarCollection(webSettings.environment)
                                    .then(function (result) {
                                        if (result != null){
                                            webSettings.solrAddress = result[0].solrAddress;
                                            webSettings.solrCollection=result[0].solrCollection;
                                        }
                                    })
                                    .catch(function (err) {
                                    });
                            }
                        });
                    }
                    else {
                        rejectAuthentication();
                    }
                });
                result.on('error', function (err) {
                    rejectAuthentication();
                });
            });

            return deferred.promise;
        },


        //ldapVariable : ldap variable name you want to search against


        searchUsers: function(userMatch) {

            var deferred = Q.defer();
            var ldapClient = ldap.createClient({
                url: webSettings.ldapAddress
            });
            var ldapOptions = {
                scope: 'sub',
                attributes: ['ldapVariable', 'uid'],
                filter: '(|(ldapVariable=*' + userMatch + '*)(uid=' + userMatch + '))'
            };
            var lookupResults = [];

            ldapClient.search(dnFilter, ldapOptions, function (err, result) {
                result.on('searchEntry', function (entry) {
                    lookupResults.push({
                        Name: entry.object.shcDisplayName,
                        Id: entry.object.uid
                    });
                });
                result.on('end', function (result) {
                    deferred.resolve(lookupResults);
                });
                result.on('error', function (err) {
                    deferred.reject(err);
                });
            });

            return deferred.promise;
        }

    };

    return new LDAPServ();
};

    obj = {
        "VCAP_SERVICES": {
            "user-provided": [
                {
                    "credentials": {
                        "alias": "firstAlias",
                        "url": "https://firstalias.url"
                    },
                    "label": "user-provided",
                    "name": "firstAlias",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "secondAlias",
                        "url": "https://secondalias.url"
                    },
                    "label": "user-provided",
                    "name": "secondAlias",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "thirdAlias",
                        "url": "https://firstalias.url"
                    },
                    "label": "user-provided",
                    "name": "thirdAlias",
                    "syslog_drain_url": "",
                    "tags": []
                }
            ]
        }
    }

    obj2 = {
        "VCAP_SERVICES": {
            "user-provided": [
                {
                    "credentials": {
                        "alias": "billy",
                        "url": "https://billy.url"
                    },
                    "label": "user-provided",
                    "name": "billy",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "bob",
                        "url": "https://bob.url"
                    },
                    "label": "user-provided",
                    "name": "bob",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "thorton",
                        "url": "https://thorton.url"
                    },
                    "label": "user-provided",
                    "name": "thorton",
                    "syslog_drain_url": "",
                    "tags": []
                }
            ]
        }
    }

    obj3 = {
        "VCAP_SERVICES": {
            "user-provided": [
                {
                    "credentials": {
                        "alias": "just",
                        "url": "https://one.url"
                    },
                    "label": "user-provided",
                    "name": "more",
                    "syslog_drain_url": "",
                    "tags": []
                }
            ]
        }
    }

    mergedCredentialsObj = {
        "VCAP_SERVICES": {
            "user-provided": [
                {
                    "credentials": {
                        "alias": "firstAlias",
                        "url": "https://firstalias.url"
                    },
                    "label": "user-provided",
                    "name": "firstAlias",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "secondAlias",
                        "url": "https://secondalias.url"
                    },
                    "label": "user-provided",
                    "name": "secondAlias",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "thirdAlias",
                        "url": "https://firstalias.url"
                    },
                    "label": "user-provided",
                    "name": "thirdAlias",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "billy",
                        "url": "https://billy.url"
                    },
                    "label": "user-provided",
                    "name": "billy",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "bob",
                        "url": "https://bob.url"
                    },
                    "label": "user-provided",
                    "name": "bob",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "thorton",
                        "url": "https://thorton.url"
                    },
                    "label": "user-provided",
                    "name": "thorton",
                    "syslog_drain_url": "",
                    "tags": []
                },
                {
                    "credentials": {
                        "alias": "just",
                        "url": "https://one.url"
                    },
                    "label": "user-provided",
                    "name": "more",
                    "syslog_drain_url": "",
                    "tags": []
                }
            ]
        }
    }

    quotes = "'"
    expectedFileContents = 'export VCAP_SERVICES=' + quotes + JSON.stringify(obj.VCAP_SERVICES) + quotes
    mergedFileContents = 'export VCAP_SERVICES=' + quotes + JSON.stringify(mergedCredentialsObj.VCAP_SERVICES) + quotes
    testFilePath = 'test/testfile'

    module.exports =
        expectedFileContents: expectedFileContents
        obj: obj
        obj2: obj2
        obj3: obj3
        testFilePath: testFilePath
        mergedCredentialsObj: mergedCredentialsObj
        mergedFileContents: mergedFileContents

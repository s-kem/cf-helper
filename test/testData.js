// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
    const obj = {
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
    };

    const obj2 = {
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
    };

    const obj3 = {
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
    };

    const mergedCredentialsObj = {
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
    };

    const quotes = "'";
    const expectedFileContents = 'export VCAP_SERVICES=' + quotes + JSON.stringify(obj.VCAP_SERVICES) + quotes;
    const mergedFileContents = 'export VCAP_SERVICES=' + quotes + JSON.stringify(mergedCredentialsObj.VCAP_SERVICES) + quotes;
    const testFilePath = 'test/testfile';

    module.exports = {
        expectedFileContents,
        obj,
        obj2,
        obj3,
        testFilePath,
        mergedCredentialsObj,
        mergedFileContents
    };

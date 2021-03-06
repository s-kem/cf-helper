// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
const vcap1 = {
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

const cfenvOutput = `\
Getting env variables for app app in some place as a person
OK


System-Provided:
${JSON.stringify(vcap1)}
{
 "VCAP_APPLICATION": {
  "thing": "stuff"
 }
}

User-Provided:
cdnHost: some-cdn-host
localDevelopment: false

No running env variables have been set

No staging env variables have been set
\
`;


const vcap2 = {
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
const cfenvOutput2 = `\
Getting env variables for app app in some place as a person
OK


System-Provided:
${JSON.stringify(vcap2)}
{
 "VCAP_APPLICATION": {
  "thing": "stuff"
 }
}

User-Provided:
cdnHost: some-cdn-host
localDevelopment: false

No running env variables have been set

No staging env variables have been set
\
`;

const vcap3 = {
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
const cfenvOutput3 = `\
Getting env variables for app app in some place as a person
OK


System-Provided:
${JSON.stringify(vcap3)}
{
 "VCAP_APPLICATION": {
  "thing": "stuff"
 }
}

User-Provided:
cdnHost: some-cdn-host
localDevelopment: false

No running env variables have been set

No staging env variables have been set
\
`;


const mergedContents = {
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

module.exports = {
    vcap1,
    vcap2,
    vcap3,
    cfenvOutput,
    cfenvOutput2,
    cfenvOutput3,
    mergedContents
};

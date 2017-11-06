const travisPing = require("travis-ping");

const repos = [
    "unitejs-test-matrix/au-matrix",
    "unitejs-test-matrix/ng-matrix",
    "unitejs-test-matrix/pa-matrix",
    "unitejs-test-matrix/po-matrix",
    "unitejs-test-matrix/pr-matrix",
    "unitejs-test-matrix/re-matrix",
    "unitejs-test-matrix/vu-matrix"
];

let repoCounter = 0;
const pingRepo = (index) => {
    console.log("Pinging", repos[repoCounter]);
    travisPing.ping(
        { github_token: process.env.GITHUB_ACCESS_TOKEN },
        repos[repoCounter],
        { branch: 'master' },
        (travisResponse) => {
            if (travisResponse) {
                console.log(JSON.stringify(travisResponse))
            } else {
                console.log("Completed Successfully");
            }
            repoCounter++;
            if (repoCounter < repos.length) {
                setTimeout(() => pingRepo(repoCounter), 10000);
            }
        }
    )
};
pingRepo(repoCounter);
const travisPing = require("travis-ping");

const repos = [
    "unitejs-test-matrix/au-requirejs-matrix",
    "unitejs-test-matrix/au-systemjs-matrix",
    "unitejs-test-matrix/ng-browserify-matrix",
    "unitejs-test-matrix/ng-systemjs-matrix",
    "unitejs-test-matrix/ng-webpack-matrix",
    "unitejs-test-matrix/po-browserify-matrix",
    "unitejs-test-matrix/po-systemjs-matrix",
    "unitejs-test-matrix/po-webpack-matrix",
    "unitejs-test-matrix/pr-browserify-matrix",
    "unitejs-test-matrix/pr-requirejs-matrix",
    "unitejs-test-matrix/pr-systemjs-matrix",
    "unitejs-test-matrix/pr-webpack-matrix",
    "unitejs-test-matrix/re-browserify-matrix",
    "unitejs-test-matrix/re-requirejs-matrix",
    "unitejs-test-matrix/re-systemjs-matrix",
    "unitejs-test-matrix/re-webpack-matrix",
    "unitejs-test-matrix/va-browserify-matrix",
    "unitejs-test-matrix/va-requirejs-matrix",
    "unitejs-test-matrix/va-systemjs-matrix",
    "unitejs-test-matrix/va-webpack-matrix",
    "unitejs-test-matrix/vu-browserify-matrix",
    "unitejs-test-matrix/vu-requirejs-matrix",
    "unitejs-test-matrix/vu-systemjs-matrix",
    "unitejs-test-matrix/vu-webpack-matrix"
];

console.log("Testing Branch", process.env.TRAVIS_BRANCH);

let repoCounter = 0;
const pingRepo = (index) => {
    console.log("Pinging", repos[repoCounter]);
    travisPing.ping(
        { github_token: process.env.GITHUB_ACCESS_TOKEN },
        repos[repoCounter],
        { branch: process.env.TRAVIS_BRANCH },
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
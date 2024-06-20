const dbConfig = {
    contactPoints: [
        "node-0.aws-us-east-1.246af2a72e5a6f9e90bc.clusters.scylla.cloud",
        "node-1.aws-us-east-1.246af2a72e5a6f9e90bc.clusters.scylla.cloud",
        "node-2.aws-us-east-1.246af2a72e5a6f9e90bc.clusters.scylla.cloud"
    ],
    localDataCenter: 'AWS_US_EAST_1',
    keyspace: 'my_keyspace',
    credentials: {
        username: 'scylla',
        password: '6NY3q4XaCKRegQF'
    }
};

export default dbConfig;

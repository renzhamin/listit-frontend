export const lists: any[] = [
    {
        id: "1",
        title: "How to connect to mongodb atlas",
        content: [
            {
                title: "Create an accunt",
                content: "Go to MongoDB Atlas and Sign In with Github/Google",
            },
            {
                title: "Create a cluster",
                content: "Choose the M0 cluster and click on create",
            },
            {
                title: "Copy connection url",
            },
        ],
    },

    {
        id: "2",
        title: "Ways to sort in python",
        content: [
            {
                title: "sort method",
                content:
                    "Use the default sort member method of the containers (such as list).",
            },
            {
                title: "sorted function",
                content:
                    "sorted is the same as sort but it takes a functional approach and takes the iterable container as the first parameter",
            },
            {
                title: "operator overloading",
                content:
                    "overload the < operator and call sort/sorted for array of custom objects",
            },
        ],
    },

    {
        id: "3",
        title: "How to setup mongodb locally for prisma",
        content: [
            {
                title: "Pull a mongodb replica docker image",
                content: "docker pull prismagraphql/mongo-single-replica:5.0.3",
            },

            {
                title: "Run the image",
                content:
                    'docker run --name mongo \
                    -p 27017:27017 \
                    -e MONGO_INITDB_ROOT_USERNAME="monty" \
                    -e MONGO_INITDB_ROOT_PASSWORD="pass" \
                    -d prismagraphql/mongo-single-replica:5.0.3 ',
            },

            {
                title: "Connection URL",
                content:
                    'DATABASE_URL="mongodb://monty:pass@localhost:27017/db_name?authSource=admin&directConnection=true"',
            },
        ],
    },
]

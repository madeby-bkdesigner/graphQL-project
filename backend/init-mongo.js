db.createUser(
    {
        user: "kay",
        pwd: "khalid",
        roles: [
            {
                role: "readWrite",
                db: "admin"
            }
        ]
    }
)
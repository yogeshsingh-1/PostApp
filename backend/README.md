<!-- Packages -->
<!-- google developer console -->
npm install passport-google-oauth20 passport

done(error, user, info)
Argument	Meaning
error	Agar system error ho
user	Authenticated user
info	Extra message (optional)


<!-- passport give me some things -->

req.isAuthenticated()
req.user
req.login(user,callback)
req.logout(callback)

<!-- basic info -->
{ scope: ["profile", "email"] }
Tum Google se kya data maang rahe ho.

"profile" → name, photo, basic info

"email" → user ka email


GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET = 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=oauth
DB_USER=postgres
DB_PASSWORD=
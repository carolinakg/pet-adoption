import Route from "@ioc:Adonis/Core/Route";


Route.post("/login", "AuthController.login");
Route.post("/logout", "AuthController.logout");
Route.post("/signup", "PeopleController.signup");
Route.get( "/pet/:id", "PetsController.show");
Route.get("/pet", "PetsController.index");
Route.get('/pet/user/:id', 'PeopleController.userPets');
Route.get('/user/:id', 'PeopleController.show');
Route.get('/user/:id/full', 'PeopleController.showFull');





Route.group(() => {
  Route.get("/auth/me", "AuthController.me");

  Route.post("/pet/:id/adopt", "PetsController.adopt");
  Route.post("/pet/:id/return", "PetsController.return");
  Route.post("/pet/:id/save", "PetsController.save");
  Route.delete("/pet/:id/save", "PetsController.deleteSave");
  Route.put('/user', 'PeopleController.update'); //no id, you can only edit your profile

  

  Route.post("/pet", "PetsController.store");
  Route.put("/pet/:id", "PetsController.update");
  Route.get('/user', 'PeopleController.index');
  Route.post("/user/:id/makeadmin", "PeopleController.makeAdmin");
  
  
}).middleware("auth");



import Route from '@ioc:Adonis/Core/Route'


//Authentification
Route.post('register', 'AuthController.register')
Route.post('login', 'AuthController.login')
Route.get("authentication/:phone", "AuthController.loginMobile")
Route.get("authentication/qr/:phone/:message", "AuthController.logingQr")
Route.get('logout', 'AuthController.logout')
Route.get('validate/:code', 'AuthController.validateCompte')
Route.get('create_code/:email', 'AuthController.createCodeChangePassword')


//Compte
Route.get("me", "UsersController.getMe")
.middleware('auth')
Route.get("me/paniers", "UsersController.getPanier")
.middleware('auth')
Route.resource("users", "UsersController").apiOnly()
.middleware({ '*': ['auth']})

Route.resource("notif_versions", "NotifVersionController").apiOnly()
.middleware({ '*': ['auth']})

Route.get("notif_versions/get/last","NotifVersionController.getLastNotifVersion")


Route.resource("stocks", "StockController")
.apiOnly().middleware({ '*': ['auth']})

Route.get("stocks/periodes/:start/:end", "StockController.getByPeriode").middleware('auth')
Route.get("stocks/periodes/product/:start/:end/:id", "StockController.getByPeriodeAndProduct").middleware('auth')

Route.resource("images", "ImageController").apiOnly()
.middleware({ '*': ['auth']})

Route.resource("unites", "UnitesController").apiOnly()

Route.resource("magasins", "MagasinController").apiOnly()

Route.resource("new_lestters", "NewlestterController").apiOnly()

Route.get("users/search/:word", "UsersController.searchUser")
Route.get("users/role/:role", "UsersController.getUser")
Route.post('users/password', "UsersController.updatePassword").middleware("auth")

Route.post('users/magasins', "UsersController.affecterMagasin").middleware("auth")
Route.get('users/patrons/:id', "UsersController.userByEntreprise").middleware("auth")
Route.get('users/password-code-send/:email', "UsersController.sendNewPasswordByEmail")

//Produit
Route.resource("categories", "CategorieController").apiOnly()
  .middleware({ 'store': ['auth'] })
Route.resource("products", "ProductController")/*.apiOnly()
  .middleware({ 'store': ['auth'] })*/

Route.get("products/index/recents", "ProductController.recent")

Route.get("products/entreprise/product/:entreprise/:product", "ProductController.getByEntrepriseName")

//Search
Route.get("search/product/:word","ProductController.search")
Route.get("search/blog/:word","BlogsController.searchPoposition")
Route.get("search/podcast/:word","PodcastChapterController.searchPoposition")

Route.resource("reviews", "ReviewController").apiOnly()
  .middleware({ '*': ['auth'] })
Route.get('reviews/product/:id' , "ReviewController.getReviewByProduct").middleware("auth")
Route.get('reviews/site/list' , "ReviewController.getSite");
Route.get('reviews/site/list/me' , "ReviewController.getSiteByMe").middleware("auth")
Route.get("categorie-product/:id", "ProductController.getByCategorie")
Route.get("magasin-product/:id", "ProductController.getByMagasin")
Route.get("magasin-categorie-product/:id_magasin/:id_categorie", "ProductController.getByMagasinAndCategorie")

Route.resource("taxes", "TaxeController").apiOnly()
  .middleware({ '*': ['auth'] })

//Commande
Route.resource("orders", "OrderController").apiOnly()
  .middleware({ '*': ['auth'] })

  Route.post('orders/clients/save', "OrderController.clientSave")
  
  Route.get("orders/paniers_products/:id", "OrderController.showPanier").middleware("auth")

    
  Route.get("orders/deliverer/:id", "OrderController.byDeliverer").middleware("auth")

Route.get("orders/users/me", "OrderController.indexMe").middleware("auth")
Route.get("orders/product/:id", "OrderController.getProductPanier").middleware("auth")

//Fichier
Route.post('upload/encode', "FilesController.uploadFileByBase64")
Route.post('upload', "FilesController.uploadFile")
Route.post('multiples-upload', "FilesController.uploadMultipleFile")
Route.get("download/:name", "FilesController.downloadFile")

//Dashboard
Route.resource("notifications", "NotificationsController").apiOnly()
  .middleware({ '*': ['auth'] })
  Route.resource("contacts", "ContactsController").apiOnly();


  Route.get('dashboard/:start/:end', "DashboardController.getByPeriode").middleware("auth")


//Blogs
Route.resource("categorie_blogs", "CategorieBlogsController").apiOnly()
  .middleware({ 'store': ['auth'] })
Route.resource("blogs", "BlogsController").apiOnly()
  .middleware({ 'store': ['auth'] })
Route.get('blogs/index/recents',"BlogsController.recent")

Route.get('panier_products/quantite/:id/:quantite/:product_id',"PanierProductsController.changeQuantite").middleware('auth')
Route.post('panier_products', "PanierProductsController.store").middleware('auth')
Route.delete('panier_products/:id', "PanierProductsController.delete").middleware('auth')







  //Ajouter lieu a frais de livraison lors de la creation du lieu 
Route.resource('frais-livraisons', "FraisLivraisonsController").apiOnly()
  .middleware({ '*': ['auth'] })
Route.get('frais-livraisons/lieu/:lieu/:min/:max', "FraisLivraisonsController.showByLieu").middleware("auth")

Route.resource("coupons", "CouponsController").apiOnly()
  .middleware({ '*': ['auth'] })
Route.get("coupons/codes/:code", "CouponsController.showByCodes")
Route.get("coupons/code/:code", "CouponsController.showByCode")



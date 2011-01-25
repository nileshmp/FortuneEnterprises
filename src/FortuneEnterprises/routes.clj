(ns FortuneEnterprises.routes
  (:use [compojure.core]
        [ring.adapter.jetty :only [run-jetty]])
  (:require [compojure.route :as route])
  (:gen-class))

(defroutes main-routes
  (GET "/" [] "<h1>Welcome to Fortune Enterprises</h1>")
  (route/not-found "Page not found"))




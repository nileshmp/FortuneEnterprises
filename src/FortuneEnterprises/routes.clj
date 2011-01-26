(ns FortuneEnterprises.routes
  (:use [compojure.core]
        [ring.adapter.jetty :only [run-jetty]])
  (:require [compojure.route :as route])
  (:gen-class))

(defn renderInvoice []
  (slurp "html/Fortune-Worksheet.html"))

(defn handleInvoice [params]
  ())

(defroutes main-routes
  (GET "/" [] "<h1>Welcome to Fortune Enterprises</h1>")
  (GET "/Invoice" [] (renderInvoice))
  (POST "/SubmitInvoice" {params :params}  (handleInvoice params))
  (route/not-found "Page not found"))




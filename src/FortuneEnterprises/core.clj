(ns FortuneEnterprises.core
  (:use [compojure.core]
        [ring.adapter.jetty])
  (:require [compojure.route :as route]))

(defroutes rts
  (GET "/" [] "<h1>Welcome to Fortune Enterprises</h1>")
  (route/files "/" {:root "html"})
  (route/not-found "Page not found"))

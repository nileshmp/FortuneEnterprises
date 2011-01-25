(ns FortuneEnterprises.core
  (:use [ring.adapter.jetty]))

(def jetty (future (run-jetty rts {:port 8080
                                   :join? false}))) 
(defn start-jetty [] jetty)
(start-jetty)

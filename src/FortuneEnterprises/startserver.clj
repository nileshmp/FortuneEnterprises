(ns FortuneEnterprises.startserver
  (:use FortuneEnterprises.routes
        ring.adapter.jetty   
        [ring.util.response]
        [ring.middleware file file-info stacktrace reload]))

;; (def jetty (future (run-jetty (var main-routes) {:port 8080
;;                                    :join? false}))) 
;; (defn start-jetty [] jetty)
;; (start-jetty)


(run-jetty 
 (->  
  main-routes    
  (wrap-reload '(FortuneEnterprises.routes))
  (wrap-stacktrace)
  (wrap-file "html")
  wrap-file-info) 
 {:port 8080
  :join? false})
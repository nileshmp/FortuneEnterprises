(ns FortuneEnterprises.DB.ConnectToH2
 (:use clojure.contrib.sql))

;
; specify the path to your database driver
; 
;; (add-classpath "file:///~/Work/h2/bin/h2-1.3.151.jar")


(let [db-protocol "tcp"            ; "file|mem|tcp"
      db-host     "192.168.1.2:8082" ; "path|host:port"
      db-name     "~/FE"]
 
  (def db {:classname   "org.h2.Driver" ; must be in classpath
           :subprotocol "h2"
           :subname (str db-protocol "://" db-host "/" db-name)
           ; Any additional keys are passed to the driver
           ; as driver-specific properties.
           :user     "fortune"
           :password "fortune"}))
 
 
;;
;; Here is an example of creating a symbol in the 
;; existing namespace as an alias to a namespace
;;
(require '[clojure.contrib.sql :as sql])

(defn execute-sql []
  (println "inside execute-sql")
  (sql/with-connection db
    (sql/with-query-results rs ["select * from MERCHANT"]
      (dorun (map #(println (:NAME %)) rs)))))

(defn -main [& args]
  (println "inside main")
  (execute-sql))

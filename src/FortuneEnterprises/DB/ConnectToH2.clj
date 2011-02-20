(let [db-protocol "tcp"            ; "file|mem|tcp"
      db-host     "192.168.1.2:8082" ; "path|host:port"
      db-name     "FE"]
 
  (def db {:classname   "org.h2.Driver" ; must be in classpath
           :subprotocol "h2"
           :subname (str db-protocol "://" db-host "/" db-name)
           ; Any additional keys are passed to the driver
           ; as driver-specific properties.
           :user     "fortune"
           :password "fortune"}))
 
;
; specify the path to your database driver
; 
(add-classpath "file:///c:/Installation/h2/bin/h2.jar")
 
;;
;; Here is an example of creating a symbol in the 
;; existing namespace as an alias to a namespace
;;
;(require '[clojure.contrib.sql :as sql]) 
;(sql/with-connection db
;  (sql/with-query-results rs ["select * from customer"]
;    (dorun (map #(println (:lastname %)) rs))))
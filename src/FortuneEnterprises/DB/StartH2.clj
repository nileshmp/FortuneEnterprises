(ns FortuneEnterprises.DB.StartH2
  (:import
           [org.h2.tools Console]))

(defn start-database [args]
  (doto (new Console) (.runTool (args))))

(start-database ("" "" ""))
(defproject FortuneEnterprises "1.0.0-SNAPSHOT"
  :main FortuneEnterprises.DB.StartH2
  :description "FIXME: write"
  :dependencies [[org.clojure/clojure "1.2.0"]
                 [org.clojure/clojure-contrib "1.2.0"]
                 [compojure "0.6.0-RC1"]
                 [ring "0.3.5"]
                 [clojureql "1.0.0-beta2-SNAPSHOT"]
                 [org.clojars.technomancy/clj-stacktrace "0.2.1-SNAPSHOT"]]
  :dev-dependencies [[swank-clojure "1.2.1"]])

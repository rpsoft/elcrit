#MyData <- read.csv(file="c:/TheDataIWantToReadIn.csv", header=TRUE, sep=",")
# install.packages("dplyr")
# install.packages("httr")
# install.packages("xml2")
# install.packages("curl")

library(dplyr)
library(magrittr)
library(readr)
library("stringr")

trialData_sample <- read_csv("/home/jesus/ihw/tdata_sample.csv")

exclusions_only_set <- filter(trialData_sample, (trialData_sample$"Inclusion/Exclusion" == "Exclusion" & trialData_sample$"Negated" == "False") | (trialData_sample$"Inclusion/Exclusion" == "Inclusion" & trialData_sample$"Negated" == "True") )

countTermCUI <- exclusions_only_set %>% select(Term, CUI) %>% group_by(Term, CUI) %>% count(CUI) 


allTermsCount <- exclusions_only_set$CUI %>%
  unlist() %>%
  paste(collapse =";") %>%
  strsplit(";") %>%
  table() %>%
  as.data.frame() %>% arrange(desc(Freq))


hist(allTermsCount$Freq, breaks=100)
plot(allTermsCount$Freq,type = "l")




higherfreq <- countTermCUI %>% filter(n > 10) %>% select(Term,n)

higherfreq$Term

library( extrafont )
library( tagcloud )
library ( fonts )
tagcloud( higherfreq$Term, weights=higherfreq$n )
dev.copy2pdf( file= "sample1.pdf", out.type= "cairo" )




# %>%
#   arrange(Freq) 

# %>%
#   write.table( file = "foo.csv", sep = ",", col.names = NA, qmethod = "double")
# 
# 
# trialData_sample$Term
# 


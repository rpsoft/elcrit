#MyData <- read.csv(file="c:/TheDataIWantToReadIn.csv", header=TRUE, sep=",")
# install.packages("dplyr")
# install.packages("httr")
# install.packages("xml2")
# install.packages("curl")

library(dplyr)
library(magrittr)
library(readr)
library("stringr")

trialData_sample <- read_csv("/home/jesus/ihw/elcrit/eligibility_trialData_final.csv")

exclusions_only_set <- filter(trialData_sample, (trialData_sample$"Inclusion/Exclusion" == "Exclusion" & trialData_sample$"Negated" == "False") | (trialData_sample$"Inclusion/Exclusion" == "Inclusion" & trialData_sample$"Negated" == "True") )

onlyConditions <- filter(exclusions_only_set, exclusions_only_set$"Caption" == "Condition")

countTermCUI <- onlyConditions %>% select(Term, CUI) %>% group_by(Term, CUI) %>% count(CUI) 


allTermsCount <- onlyConditions$CUI %>%
  unlist() %>%
  paste(collapse =";") %>%
  strsplit(";") %>%
  table() %>%
  as.data.frame() %>% arrange(desc(Freq))

# 
# hist(allTermsCount$Freq, breaks=100)
# plot(allTermsCount$Freq,type = "l")
# 
# 

# 
# higherfreq <- countTermCUI %>% filter(n > 10) %>% select(Term,n)
# 
# higherfreq$Term
# 
library( extrafont )
library( tagcloud )
library ( fonts )
# tagcloud( higherfreq$Term, weights=higherfreq$n )
# dev.copy2pdf( file= "sample1.pdf", out.type= "cairo" )


# exclusions_only_set %>% filter(grepl("alzheimer", exclusions_only_set$"Term")) %>% View()
# 
# 
# grepl("female", "femal")
# 





collapsed <- countTermCUI[0, ]
for ( i in 1:nrow(countTermCUI) ){
  
  # print(countTermCUI[i,"CUI"])
  
  indices <- which(collapsed$"CUI" == countTermCUI[[i,"CUI"]])
  
  if ( length(indices) < 1){
    collapsed[nrow(collapsed) + 1, ] <- countTermCUI[i, ]
  } else {
    collapsed[indices[1], "Term"] <- paste(collapsed[indices[1], "Term"], countTermCUI[i, "Term"], sep="$" )
    collapsed[indices[1], "n"] <- (collapsed[indices[1], "n"] + countTermCUI[i, "n"])
  }

  
}

higherfreq <- collapsed %>% filter(n > 10) %>% select(Term,n)

tagcloud( higherfreq$Term, weights=higherfreq$n )

names(onlyConditions)[2]<-"nct_id"

joined_table <- onlyConditions %>% right_join(conditions_lkp)

aggregatedTermsTable <- joined_table %>%
  group_by(mesh_broad_label) %>%
  mutate(allTerms = paste0(Term, collapse =";")) %>%
  select(mesh_broad_label,allTerms) %>% 
  distinct()

library(purrr)

map(aggregatedTermsTable, function(x) {
   
})

splitAndPlot <- function(terms){
  termList <- strsplit(terms, ";")
  print(termList[1])
  tagcloud(termList[1])
}

splitAndPlot(aggregatedTermsTable[[36,2]])

# %>%
#   arrange(Freq) 

# %>%
#   write.table( file = "foo.csv", sep = ",", col.names = NA, qmethod = "double")
# 
# 
# trialData_sample$Term
# 


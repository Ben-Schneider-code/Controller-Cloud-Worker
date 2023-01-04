# Controller-Cloud-Worker

This is a WIP project for distributing ML workloads across several worker machines.
The idea is to have a controller ----- sends an ML workload ----> cloud ------> worker machine (CUDA gpu).  
The worker(s) then perform the experiment(s) and logs the results to the cloud where they can be observed by the controller.  
This project is designed to be easy to deploy, replicate and scale as needed. That is, it should be trivial to add more workers or entire cloud instance as needed.


## Cloud
`aws configure`  
`npm run cdk bootstrap`  
`npm run cdk deploy "*"`

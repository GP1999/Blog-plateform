# Blog-plateform
This is under  implementation of below problem statements<br>
Design a simple multi-user publishing/blogging platform, allowing writers to publish and manage the blogs under their personal publication and readers to read them.

# Core Requirements
* writers should be able to publish blog under their personal publication <br>
* readers should be able to read the blog <br>
* a user can be both - a reader as well as a writer <br>
* author of the blog should be able to delete the blog <br>
* blog may contain images, but will not contain any video<br>
* time to access the blog should be as low as possible<br>
* we have to render "number of blogs" written by every user on his/her profile<br>
* users should be able to search for a particular blog<br>
* the platform should be scaled for 5 million daily active readers<br>
* the platform should be scaled for 10,000 daily active writers<br>

# Design And Solution



* ### Calculation
* Avarage size of 1 Blog = 20Kb <br>

* Daily Active Writers =10000 <br>
* Avarage number of blogs Writer write per day = 1 <br>
*avarage Write load per day = 1* 20*10000 = 200000Kb = 200Mb <br>
* 1 year data load = 200Mb*365 = 73000Mb = 73Gb <br>
* Avarage number of Blogs read by per user = 3 <br>
* Read load per day =(3 * 20Kb *5 *10^6 )/10^6 = 300Gb <br>

## System Diagram
<img width="1375" alt="Screenshot 2022-12-08 at 9 46 31 PM" src="https://user-images.githubusercontent.com/39650633/206507154-3fa0aafe-ed33-4acf-ad81-cf9bf53b8aa5.png">



## Database Schema
<img width="1375" alt="Screenshot 2022-12-08 at 9 18 49 PM" src="https://user-images.githubusercontent.com/39650633/206507467-76c28cc8-7852-4ae6-881d-03403fbea2c9.png">


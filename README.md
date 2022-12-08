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

![alt text](https://github.com/GP1999/Blog-plateform
/blob/main/doc/systemDesign.png?raw=true)

## Database Schema

![alt text](https://github.com/GP1999/Blog-plateform
/blob/main/doc/db.png?raw=true)



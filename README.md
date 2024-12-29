# Onlinegantt.com_automation_code

<h3>Product Information</h3> <p> The Online Gantt Chart (https://www.onlinegantt.com) is a web-based project management tool that helps visualize tasks and timelines in a clear, interactive format. It uses a horizontal bar chart to display project schedules, showing task durations, dependencies, and milestones. It also has features like resource allocation, progress tracking, multiple color schemes, project view, resource view, resource and settings editing.<br>
 
The Online Gantt Chart has a cloud version and a local version. I tested only the local version, which does not require creating an account.
 </a> </p>

<h3>Description</h3> <p> <h4>Performance Testing</h4> </p> <p>To test the performance of the application, I wrote a Playwright script named ganttJson.spec.js. The script reads a JSON file that contains 58 tasks (testdata58.json), another with 258 tasks (testdata258.json), and a third with 508 tasks (testdata508.json). Each file is read by the script and then it adds each task to the project. At the end of that process, the script performs a set of characteristic operations on six tasks, including indenting them, setting dependencies, assigning resources, and exporting project data.<br>
 
The purpose is to collect performance data and analyze it to observe how the application responds as the number of tasks increases.<br>

The script was run on Chromium, Firefox, and WebKit browsers.</p>

<h4>Regression Testing</h4> 
<p>The strategy for regression testing was designed to assess how the application handles the major activities. To achieve this, I wrote a Playwright script that reads testdata8.json JSON file containing eight tasks. The file is read by the script and adds each task to the project. Two tasks are designed as parent tasks, each with three child tasks, resulting in six out of eight tasks being indented. Dependencies and notes are added to four tasks, and resources are assigned six tasks. Once complete, the project file is exported as an Excel, PDF, and Image file. The file names include the day and month of their export (e.g. downloads-21DEC\before).
Once this cycle is complete, the script proceeds by renaming the tasks, changing the dependency types, adding “Sunday” as a workday, and setting specific holiday dates for tasks scheduled on those days. Screenshots are taken to provide better visualization of the project, then the project file is exported as an Excel, PDF, and Image file. The file names include the day and month of their export (e.g. downloads-21DEC\after).
<br>
<br> 
I used the “comp” command in the regression testing process. <i>comp</i> is the Windows command used to compare two files. I created a batch file called <i>check.bat</i> and I wrote the code with the guidance of my mentor, James Bach.
 
I compared the CSV, PDF and PNG files. I created a folder called Masterfiles, with “before” and “after” directories, where I saved the files from different test runs. These were then compared with the dynamic folder path (e.g. downloads-1%).

</p>

<h3>How to Run It</h3> <h4>Performance Testing</h4> 
For <i>performance testing</i>, I ran these commands: 
 <ul>
<li>npx playwright test ganttJson.spec.js --project chromium --headed. <br> I used --project chromium option to run the script in Chromium browser, and --headed mode to see the actual browser window during the test execution</li>
<li>npx playwright test ganttJson.spec.js --project firefox --headed (for Firefox browser)</li>
<li>npx playwright test ganttJson.spec.js --project webkit --headed (for WebKit browser)</li>
 </ul>

<h4>Regression Testing</h4> 
For <i>regression testing</i>, I ran these commands:
 <ul>
<li>npx playwright test regression.spec.js --project chromium --headed, where regression.spec.js contains the script designed for regression testing</li>
<li>npx playwright test regression.spec.js --project firefox --headed</li>
<li>npx playwright test regression.spec.js --project webkit --headed</li>
 </ul>
  <br>
To compare the files from the two folders (Masterfiles and downloads-21DEC), I ran the test with this command: tests\check 21DEC, where “tests” is the folder containing the “check.bat” batch file, and “21DEC” is the folder containing the CSV, PDF and PNG files.

<h3>Test Results</h3> <h4>Performance Testing</h4> <p>As the below charts illustrate, as more tasks are added, the application performance gradually slows down. These results were collected from the script run in the Chromium, Firfox, and WebKit browsers.  </p>

![Image Alt](https://github.com/user-attachments/assets/efe7203a-6d75-4ff9-981c-0ab69d120ee7)

![Image Alt](https://github.com/user-attachments/assets/1385649a-4834-4616-80c3-4c10ee618440)

![Image Alt](https://github.com/user-attachments/assets/0b69cc64-6fa8-4403-af8a-f163512dcf6b)

![Image Alt](https://github.com/user-attachments/assets/45c40d0b-171c-4bbb-964b-b5fd134b401d)

![Image Alt](https://github.com/user-attachments/assets/38ea296c-3a7b-4006-80d6-4a7c7f78b73c)

![Image Alt](https://github.com/user-attachments/assets/3ed3bc10-d27f-4904-9b47-3aa038c4bd50)


<br>
<p>Also, the script provides information about how much time is required to indent six tasks, assign resources to six tasks, and add dependencies and notes to four tasks. This data is collected after all tasks (58, 258, and 508) have been added. <br>
<br>
As illustrated in the chart below, the time required increases as more tasks are added, even when the number of indented tasks, assigned resources, added dependencies and notes remains constant.  This indicates that the product becomes difficult to use as the size of the project reaches a couple hundred tasks.
</p>

![Image Alt](https://github.com/user-attachments/assets/9a861d8c-fb49-49e4-8646-765ecf23482d)

<h4>Regression Testing</h4> 
<p>As mentioned above, the script took screenshots while running the regression test. Below are the screenshots showing that, at the time they were captured, the application was handling the activities as written in the script.

![Image Alt](https://github.com/user-attachments/assets/2c6c13ed-dfc2-435a-a4fb-5879fe7383da)

![Image Alt](https://github.com/user-attachments/assets/28919388-d1fa-4176-b65c-09603a0f963c)

![Image Alt](https://github.com/user-attachments/assets/bdfddd5d-0bca-4c2c-9ac3-385d091fec7c)

![Image Alt](https://github.com/user-attachments/assets/31ebe72d-d4d0-4183-9b63-a518d77cd51c)

Also, there are no differences between the two CSV and PNG files, but there are differences between the PDF files. This isn't due to a bug. Visually, the PDFs appear the same, but their binary data differs every time they are generated. Since these changes don't matter in terms of how the files look, a binary comparison doesn't provide meaningful insights.

Below are the test results displayed in the terminal:

![Image Alt](https://github.com/user-attachments/assets/2e5cf441-e20c-4273-9ccd-d888342deecb)

</p>




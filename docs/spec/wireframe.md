Sisyphus (A Daily Productivity Monitor):

Installation and Setup:
Npm install 
Asks user for their gemma api key and explains what the process is for getting one 
Frontend UI:
Sisyphus icon:
Ascii animation of the greek mythological character sysiphous
He should have 2 3-4 frame animations asynchronously running with the api calls (I will input the ascii images in files within the repo later):
Him pushing up his boulder 
Him standing next to his boulder yelling at the user
He should remain in the terminal and the animations should not interrupt the chat function of the app
He should hopefully remain visible during chats
This can be done via blessed or ink
He should always been in pushing state unless triggered to yelling state by no usage happening yesterday 
I will input the ascii animations
Daily review:
Greeting message
Message 1: Begins reviewing github through cli (no user input needed)
Message 2: Begins reviewing written file, asks for a self grade on first document 
Message 2.1-2.n: Asks for self grade on next document
Continue messaging for each document until a self grade is reported for every document
Message 3: Ask how many pages read today
Message 4: Return feedback 
Coding: communicate if adequate and comment on improvement relative to the day before, this week, and this month (if no data don't comment on progress). communicate the letter grade and feedback on the code 
Writing: communicate if adequate and comment on improvement relative to the day before, this week, and this month (if no data don't comment on progress). communicate the letter grade on the writing 
Reading: communicate if adequate and comment on improvement relative to the day before, this week, and this month (if no data don't comment on progress).
Ask if the user wants to see the overall progress and that they should press o
Track daily usage
If no usage yesterday begin to yell at the user pontificating in english and ancient greek (cursing) and do not stop until the user has returned an apology that is deemed genuine
Overall progress:
Display graphs with headings and subheadings
Backend Architecture:
General Architecture:
Uses Gemma 4 free api via google ai studio
Saves grading information in a file which you deem most adequate 
Daily Usage Tracking: 
On boot up return if there was a use yesterday 
If no use yesterday judge user responses until you deem an apology genuine
After 5 apologies auto deem it genuine
Coding:
Review: Uses git to investigate all commits and pull requests from the previous day
Completion Grade: Over under ⅕ of project completion
If one fifth of a project was completed or an equivalent amount as pooled across multiple projects worked on mark as adequate
Value Grade: Return brief feedback
Briefly review the commits for code cleanliness and effectiveness and return a one or two sentence response and a letter grade [F,C-,C,C+,B-,B,B+,A-,A]
as related to previous daily reviews
Writing:
Review: Read signified file
file will begin with s and then the date ie s4/14 and then can be verified by checking if the file was saved today
The agent should first check if there is one file or multiple files and then return the file names to the ui chat to finish out the messages
Completion Grade: over under 2000 words
Value Grade: Accept user adequacy response [F,C-,C,C+,B-,B,B+,A-,A] and register it as the grade for the day
If multiple responses for different pieces average across the pieces 
Reading
Review: user inputted number of pages read 
Completion Grade: over under 60 pages
Value Grade: none
Overall progress: 
User should be able to press o when prompted to open overall progress bar
Should express the numerical metric for completion through graph, If applicable express the grade for value through graph
Coding Graphs: One graph for amount of project completion (probably 0-⅗ with markers at 1/10, 3/10, 5/10 and an any arrows at the top signifying point above the graph), (when only enough data for a week the x axis should be days and the points should be dashes, when more it should be just two markers of the last two months and periods for points); One graph for value grade (A-F markers at the whole letter grades), (when only enough data for a week the x axis should be days and the points should be dashes, when more it should be just two markers of the last two months and periods for points) 
Writing Graphs: One graph for amount of words (0-2000, markers every 500, arrow for over 2000), (when only enough data for a week the x axis should be days and the points should be dashes, when more it should be just two markers of the last two months and periods for points); One graph for value grade (A-F markers at the whole letter grades), (when only enough data for a week the x axis should be days and the points should be dashes, when more it should be just two markers of the last two months and periods for points) 
Reading Graph: One graph for amount of pages (0-100, markers every 30, arrow for over 2000), (when only enough data for a week the x axis should be days and the points should be dashes, when more it should be just two markers of the last two months and periods for points)
Personality/Soul:
This is a markdown file or similar structure which contains writing about the character of sisyphus which influences the tone to which the agent answers questions. I will add the text manually leave blank for now
	
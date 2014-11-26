
self.addEventListener('message', function (e) {
    var data = e.data;

    var maxSize = 5 * 1024 * 1024;
    dbShell = window.openDatabase("MoCA", 2, "MoCA", maxSize);

 
    ////get Query
    //var result = ExecuteSql("SELECT count(*) AS 'exist' FROM sqlite_master WHERE type='table' AND name='MocaTestClients'");
    //if (data.rows.item(0).exist)
    //    return;

    //var tables = [
    //                     "CREATE TABLE IF NOT EXISTS MocaComments(commentID INTEGER PRIMARY KEY,section TEXT,comment TEXT,caneva TEXT,testID INTEGER,testTypeID INTEGER)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTest(testID INTEGER PRIMARY KEY,testDate NUMERIC,clientID INTEGER,userID INTEGER,commentResult TEXT,imageResult TEXT)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTestClients(clientID INTEGER PRIMARY KEY,name TEXT,dateOfBirth NUMERIC,gender INTEGER,education TEXT,chartNumber TEXT,physican TEXT)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTestGroup(ID INTEGER PRIMARY KEY,Title TEXT)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTestResults(resultID INTEGER PRIMARY KEY,testID INTEGER,testTypeID INTEGER,score INTEGER,timeTest NUMERIC,TbNote TEXT)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTestResultsValues(resultValueID INTEGER PRIMARY KEY,resultID INTEGER,valueNumber INTEGER,valueResult INTEGER,valueOptional TEXT)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTestType(testTypeID INTEGER PRIMARY KEY,testName TEXT,maxScore INTEGER,maxTime INTEGER)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTestType_MocaGroup(GroupId INTEGER,TestTypeId INTEGER)",
    //                     "CREATE TABLE IF NOT EXISTS MocaTestUsers(userID INTEGER PRIMARY KEY,name TEXT,occupation TEXT,username TEXT,password TEXT)",
    //                     "CREATE TABLE IF NOT EXISTS MocaImage (ID INTEGER PRIMARY KEY, Data TEXT, testID INTEGER, testTypeID INTEGER)",
    //                     "CREATE TABLE IF NOT EXISTS MocaResources (ID INTEGER PRIMARY KEY, Name TEXT, Value TEXT, Language TEXT, UpdateDate NUMERIC)"
    //];
    //for (var i = 0; i < tables.length; i++) {
    //    ExecuteSql(tables[i]);
    //}

    //var insertedData = [
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('abstraction_01','2','10')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('attention_01','1','10')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('attention_02','1','20')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('attention_03','3','5')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('delayedrecall_01','15','15')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('language_01','1','10')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('language_02','1','10')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('memory_01','5','20')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('naming_01','3','20')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('naming_02','5','15')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('naming_03','0','15')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('orientation_01','6','5')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('visuospatial_01','1','30')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('visuospatial_02','1','35')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('visuospatial_03','3','30')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('delayedrecall_02','0','3')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('delayedrecall_03','0','5')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('memory_02','0','20')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('attention_01_b','1','15')",
    //     "INSERT into MocaTestType(testName,maxScore,maxTime) values('language_01_b','1','5')"
    //];

    //for (var i = 0; i < insertedData.length; i++) {
    //    ExecuteSql(insertedData[i]);
    //}

    //insertedData = [
    //    "INSERT into MocaTestGroup(ID,Title) values('1','VISUOSPATIAL')",
    //    "INSERT into MocaTestGroup(ID,Title) values('2','NAMING')",
    //    "INSERT into MocaTestGroup(ID,Title) values('3','ATTENTION')",
    //    "INSERT into MocaTestGroup(ID,Title) values('4','LANGUAGE')",
    //    "INSERT into MocaTestGroup(ID,Title) values('5','ABSTRACTION')",
    //    "INSERT into MocaTestGroup(ID,Title) values('6','DELAYED RECALL')",
    //    "INSERT into MocaTestGroup(ID,Title) values('7','ORIENTATION')",
    //    "INSERT into MocaTestGroup(ID,Title) values('8','MEMORY')"
    //];
    //for (var i = 0; i < insertedData.length; i++) {
    //    ExecuteSql(insertedData[i]);
    //}

    //insertedData = [
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('1','13')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('1','14')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('1','15')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('2','9')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('3','2')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('3','19')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('3','3')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('3','4')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('4','6')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('4','20')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('4','7')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('5','1')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('6','5')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('6','16')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('6','17')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('7','12')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('8','8')",
    //    "INSERT into MocaTestType_MocaGroup(GroupId,TestTypeId) values('8','18')"
    //];
    //for (var i = 0; i < insertedData.length; i++) {
    //    ExecuteSql(insertedData[i]);
    //}
   
    //insertedData = [ "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('1','ShowTestResults','Show test results','En','2014-11-25 10:17:21')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('2','StartNewTest','Start new test','En','2014-11-25 10:17:28')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('3','AdministeredBy','Administered by','En','2014-11-24 18:10:14')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('4','Cancel','Cancel','En','2014-11-20 12:39:27')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('5','EnterNameOccupation','Enter your name and your occupation','En','2014-11-20 12:25:57')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('6','AreYouSure','Are you sure','En','2014-02-18 22:18:53')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('7','Confirm','Confirm','En','2014-11-20 12:48:30')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('8','SelectExistAdmin','SELECT AN EXISTING ADMINISTRATOR','En','2014-11-20 12:01:35')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('9','Or','or','En','2014-02-18 22:18:53')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('10','LastName','Last name','En','2014-11-20 12:01:16')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('11','Continue','Continue','En','2014-11-25 10:17:53')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('12','Occupation','Occupation','En','2014-11-20 12:39:22')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('13','FirstName','First name','En','2014-02-18 22:18:53')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('14','CreateNewAdmin','CREATE A NEW ADMINISTRATOR','En','2014-02-18 22:18:53')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('15','Name','Name','En','2014-11-20 12:01:49')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('17','PatientInformation','Patient information','En','2014-11-20 13:44:45')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('18','EnterPatientInformation','Enter patient information','En','2014-11-20 13:46:05')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('19','SelectExistingPatient','SELECT AN EXISTING PATIENT','En','2014-11-20 13:48:43')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('20','CreateNewPatient','CREATE A NEW PATIENT','En','2014-11-20 13:51:54')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('22','DateOfBirth','Date of birth','En','2014-11-24 16:04:16')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('23','Female','Female','En','2014-11-20 15:04:55')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('24','Male','Male','En','2014-11-20 15:05:02')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('25','Education','Education','En','2014-11-20 15:05:35')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('26','ChartNumber','Chart Number','En','2014-11-24 12:53:20')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('27','Physician','Physician','En','2014-11-20 15:06:35')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('28','Trail','Trail','En','2014-11-20 16:40:11')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('29','Instructions','Instructions','En','2014-11-25 10:35:34')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('30','ExaminerInstructsSubject','The examiner instructs the subject:','En','2014-11-20 16:41:46')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('31','TrailInstructionsText','<p>The examiner instructs the subject:</p> <blockquote>&quot;Please draw a line, going from a number to a letter in ascending order. Begin here [point to (1)] and draw a line from 1 then to A then to 2 and so on. End here [point to (E)].&quot;</blockquote> ','En','2014-11-24 14:03:49')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('32','Execution','Execution','En','2014-11-25 10:38:05')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('33','TrailExecutionInstructions','Instructions','En','2014-11-20 17:22:18')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('34','TrailExecutionInstructionsText','Please draw a line, going from a number to a letter in ascending order. Begin here [point to (1)] and draw a line from 1 then to A then to 2 and so on. End here [point to (E)].','En','2014-11-20 17:24:38')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('35','Pencil','Pencil','En','2014-11-25 10:37:48')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('36','Eraser','Eraser','En','2014-11-25 10:37:18')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('37','Reset','Reset','En','2014-11-25 10:36:59')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('38','Scoring','Scoring','En','2014-11-25 10:36:39')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('39','Score','Score','En','2014-11-25 10:36:21')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('40','Time','Time','En','2014-11-25 10:36:06')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('41','Comment','Comment','En','2014-11-25 10:35:17')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('42','TrailScoringText','Allocate one point if the subject successfully draws the following pattern: 1 - A - 2 - B - 3 - C - 4 - D - 5 - E, without drawing any lines that cross. Any error that is not immediately self-corrected earns a score of 0. A point is not allocated if the subject draws a line to connect the end (E) to the beginning (1).','En','2014-11-21 09:58:46')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('43','CubeExecutionInstructionsText','The examiner gives the following instructions, pointing to the cube:&nbsp;<br /> <strong>&ldquo;Copy this drawing as accurately as you can.&rdquo; </strong>','En','2014-11-24 12:35:35')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('44','CopyCube','Copy Cube','En','2014-11-21 10:48:42')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('45','CubeScoringTitle','Cube','En','2014-11-21 11:07:03')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('46','CubeScoringText','<p>One point is allocated for a correctly executed drawing.</p> <ul> <li>Drawing must be three-dimensional</li> <li>All lines are drawn</li> <li>No line is added</li> <li>Lines are relatively parallel and their length is similar (rectangular prisms are accepted)</li> </ul> <p>A point is not assigned if any of the above-criteria are not met.</p> ','En','2014-11-21 12:27:25')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('47','ClockTitle','Clock','En','2014-11-25 10:18:37')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('48','ClockInstructionsText','<p>Indicate and give the following instructions:</p> <blockquote>&ldquo;Draw a clock. Put in all the numbers and set the time to 10 past 11.&rdquo;</blockquote> The examiner must ensure that the subject does not look at his watch while performing the task and that no clocks are in sight.','En','2014-11-24 13:29:28')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('51','DrawClock','Draw clock (ten past eleven)','En','2014-11-21 12:35:36')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('52','ClockExecutionInsructionsText','<p>Give the following instructions:&nbsp;</p> <p><strong>&quot;Draw a clock. Put in all the numbers and set the time to 10 past 11&quot;</strong><br /> <br /> The examiner must ensure that the subject does not look at his watch while performing the task and that no clocks are in sight.</p> ','En','2014-11-21 12:32:44')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('53','Contour','Contour','En','2014-11-21 12:42:55')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('54','Numbers','Numbers','En','2014-11-21 12:44:22')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('55','ClockScoringText','<p>One point is allocated for each of the following three criteria:</p> <ul> <li>Contour (1 pt.): the clock face must be a circle with only minor distortion acceptable (e.g., slight imperfection on closing the circle);</li> <li>Numbers (1 pt.): all clock numbers must be present with no additional numbers; numbers must be in the correct order and placed in the approximate quadrants on the clock face; Roman numerals are acceptable; numbers can be placed outside the circle contour;</li> <li>Hands (1 pt.): there must be two hands jointly indicating the correct time; the hour hand must be clearly shorter than the minute hand; hands must be centred within the clock face with their junction close to the clock centre.</li> </ul> <p>A point is not assigned for a given element if any of the above-criteria are not met.</p> <p>All numbers must either be placed inside or outside the clock circle. If the subject places some numbers inside the clock circle and some outside the clock circle, he does not receive a point for Numbers.</p> <p>The numbers must be present on the clock for the subject to obtain a point for Hands. If the hands seem to placed correctly but there are no numbers on the clock, the subject does not obtain a point for Hands.</p> <p>The clock contour must be drawn. If the numbers are arranged in a circular manner but the contour is not drawn the contour is scored as incorrect.</p> <p>Different shaped contours are accepted (example: square contours). However, the numbers have to be arranged in a circular manner.</p> ','En','2014-11-21 12:56:05')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('56','Hands','Hands','En','2014-11-21 14:17:59')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('57','NamingTitle','Naming','En','2014-11-21 13:04:16')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('58','NamingInstructionText',' &ldquo;I will show you 3 animals, please tell what they are&rdquo;. ','En','2014-11-24 13:00:44')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('59','Lion','Lion','En','2014-11-21 14:22:17')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('60','Rhino','rhinoceros or rhino','En','2014-11-21 14:43:26')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('61','Camel','camel or dromedary.','En','2014-11-21 14:43:16')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('62','NamingScoringText','One point each is given for the following responses: (1) lion (2) rhinoceros or rhino (3) camel or dromedary.','En','2014-11-21 14:41:25')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('63','MemoryTitle','Memory','En','2014-11-21 15:36:23')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('64','Memory1Text','<blockquote><em>&ldquo;This is a memory test. I am going to read a list of words that you will have to remember now and later on. Listen carefully. When I am through, tell me as many words as you can remember. It doesn&rsquo;t matter in what order you say them.&rdquo;</em></blockquote> <p>Please read a list of 5 words at a rate of one per second.</p> <p>Mark a check in the allocated space for each word the subject produces on this first trial. When the subject indicates that (s)he has finished (has recalled all words), or can recall no more words, CLICK Continue to read the list a second time.</p> <p>The examiner may not correct the subject if he recalls a deformed word or a word that sounds like the target word.</p> <p>&nbsp;</p> ','En','2014-11-24 14:10:38')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('66','1Trial','1st trial','En','2014-11-24 16:10:17')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('67','Face','FACE','En','2014-11-21 15:33:54')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('68','Velvet','VELVET','En','2014-11-21 15:13:25')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('69','Church','CHURCH','En','2014-11-21 15:13:55')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('70','Daisy','DAISY','En','2014-11-21 15:14:20')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('71','Red','RED','En','2014-11-21 15:14:42')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('72','Memory2Text','<blockquote><em>I am going to read the same list for a second time. Try to remember and tell me as many words as you can, including words you said the first time.</em></blockquote> <p>Put a check in the allocated space for each word the subject recalls.</p> <p>When the subject indicates that (s) he has finished (has recalled all words), or can recall no more words, CLICK Continue. ALSO Inform the subject that (s)he will be asked to recall these words again by saying,</p> <blockquote><em>&ldquo;I will ask you to recall those words again at the end of the test.&rdquo;</em></blockquote> ','En','2014-11-24 14:20:40')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('75','2Trial','2nd trial','En','2014-11-21 15:34:17')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('76','DigitSpanForwardTitle','Digit span-Forward ','En','2014-11-24 14:22:41')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('77','ExecutionScoring','Execution and Scoring','En','2014-11-25 10:34:59')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('78','DigitSpanForwardText','<blockquote>&ldquo;I am going to say some numbers and when I am through,&nbsp;repeat them to me exactly as I said them.&rdquo;</blockquote> <p>Subject has to repeat them in the forward order. Read list of digits (1 digit / sec.).</p> ','En','2014-11-24 13:47:02')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('80','DigitSpanBackwordTitle','Digit span-Backward','En','2014-11-21 16:13:10')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('81','DigitSpanBackwardText','<blockquote><em>&ldquo;Now I am going to say some more numbers, but when I am through you must repeat them to me in the backwards order.&rdquo;</em></blockquote> If the subject repeats the sequence in the forwards order, the examiner may not ask the subject to repeat the sequence in the backwards order at this point. <p>Subject has to repeat them in the backward order. Read list of digits (1 digit / sec.).</p> ','En','2014-11-24 13:46:12')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('84','LetterATitle','Letter A','En','2014-11-24 14:28:08')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('85','LetterAText','<blockquote><em>&ldquo;I am going to read a sequence of letters. Every time I say the letter A, tap your hand once. If I say a different letter, do not tap your hand.&rdquo;</em></blockquote> Read list of letters at a rate of one per second. The subject must tap with his hand at each letter A.&nbsp;<strong>No points if &gt;= 2 errors</strong><br /> Please click on each error','En','2014-11-24 13:49:39')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('89','CalculationTitle','Calculation','En','2014-11-21 16:39:30')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('90','CalculationText','Serial 7 subtraction starting at 100','En','2014-11-24 16:30:54')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('91','CalculationInstructionsText','<p>The examiner gives the following instruction:</p> <blockquote>&ldquo;Now, I will ask you to count by subtracting seven from 100, and then, keep subtracting seven from your answer until I tell you to stop.&rdquo;</blockquote> <p>This instruction may only be given twice if necessary.</p> ','En','2014-11-21 16:39:49')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('92','RepetitionTitle','Repetition','En','2014-11-21 16:56:35')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('94','RepetitionSentence1','I only know that John is the one to help today.','En','2014-11-21 16:56:49')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('96','RepetitionSentence2','The cat always hid under the couch when dogs were in the room.','En','2014-11-21 16:57:02')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('97','RepetitionInstructionsText','<p>The examiner gives the following instructions:</p> <blockquote>&ldquo;I am going to read you two sentences. Repeat them exactly as I say them.&rdquo;</blockquote> ','En','2014-11-21 16:57:17')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('98','RepetitionScoringText','Allocate 1 point for each sentence correctly repeated. Repetition must be exact. Be alert for errors that are omissions (e.g., omitting &quot;only&quot;, &quot;always&quot;) and substitutions/additions (e.g., &quot;John is the one who helped today;&quot; substituting &quot;hides&quot; for &quot;hid&quot;, altering plurals, etc.).','En','2014-11-21 16:57:31')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('99','FluencyTitle','Fluency','En','2014-11-21 17:53:02')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('100','FluencyInstructionsText','<p>The examiner gives the following instruction:</p> <blockquote>&nbsp;&quot;Now, I want you to tell me as many words as you can think of that begin with the letter F.<br /> I will tell you to stop after one minute.<br /> Are you ready?&quot;</blockquote> <p>If the subject names two consecutive proper nouns (like Bob or Boston), numbers or words that begin with the same sound but have a different suffix, for example, love, lover, loving, the examiner says:</p> <blockquote> <p>&lsquo;<strong>&lsquo;Tell me other type of words than (proper nouns, numbers or words that begin with love)&rsquo;&rsquo;.</strong></p> </blockquote> <p>If the subject names two consecutive words that begin with another letter of the alphabet, the examiner may repeat the target letter if the instructions may not yet been repeated.</p> <p>No more than one of each of the following types of words may be accepted for scoring: proper nouns, numbers or words that begin with the same sound but have a different suffix.</p> ','En','2014-11-25 10:50:38')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('101','FluencyExeсutionText','Fluency / Name maximum number of words in one minute that begin with the letter','En','2014-11-24 14:49:54')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('102','FluencyNWords','(N &ge; 11 words)','En','2014-11-24 16:40:28')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('103','PleaseStop','PLEASE STOP','En','2014-11-25 10:22:31')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('104','FluencyRecord','Record the subject&#39;s response in box below','En','2014-11-21 17:54:23')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('105','FluencyExecutionInstructionsText','<p>The examiner gives the following instruction:</p> <blockquote>&nbsp;&ldquo;Tell me as many words as you can think of that begin with a certain letter of the alphabet that I will tell you in a moment. You can say any kind of word you want, except for proper nouns (like Bob or Boston), numbers, or words that begin with the same sound but have a different suffix, for example, love, lover, loving. I will tell you to stop after one minute. Are you ready?&quot;</blockquote> If the subject names two consecutive proper nouns (like Bob or Boston), numbers or words that begin with the same sound but have a different suffix, for example, love, lover, loving, the examiner says: <blockquote> <p><strong>&lsquo;&lsquo;Tell me other type of words than (proper nouns, numbers or words that begin with love)&rsquo;&rsquo;.</strong></p> </blockquote> If the subject names two consecutive words that begin with another letter of the alphabet, the examiner may repeat the target letter if the instructions may not yet been repeated.','En','2014-11-25 10:51:56')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('106','FluencyScoringText','No more than one of each of the following types of words may be accepted for scoring: proper nouns, numbers or words that begin with the same sound but have a different suffix.','En','2014-11-21 17:54:46')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('107','AbstractionTitle','Abstraction','En','2014-11-24 15:00:53')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('108','AbstractionInstructionsText','<p>The examiner asks the subject to explain what each pair of words has in common, starting with the example:</p> <blockquote>&nbsp;&ldquo;Tell me how an orange and a banana are alike&rdquo;.</blockquote> If the subject responds correctly the examiner replies, <blockquote>&lsquo;&lsquo;Yes, both items are part of the category Fruits&rsquo;&rsquo;.</blockquote> If the subject answers in a concrete manner, then only give one additional prompt: <blockquote>&ldquo;Tell me another way in which those items are alike&rdquo;.</blockquote> If the subject does not give the appropriate response (fruit), the examiner says, <blockquote>&ldquo;Yes, and they also both belong to the category Fruits.&rdquo;</blockquote> No additional instructions or clarifications are given. After the practice trial, the examiner says: <blockquote>&nbsp;&ldquo;Now, tell me how a train and a bicycle are alike&rdquo;.</blockquote> Following the response, administer the second trial: <blockquote>&ldquo;Now tell me how a ruler and a watch are alike&rdquo;.</blockquote> A prompt (one for the entire abstraction section) may be given if none was used during the example.','En','2014-11-24 15:01:32')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('109','AbstractionExecutionText','Do not give any additional instructions or prompts.','En','2014-11-24 15:01:46')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('110','AbstractionExecutionSentence1','&ldquo;Now, tell me how a train and a bicycle are alike&rdquo;.','En','2014-11-24 15:02:03')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('111','AbstractionExecutionSentence2','&ldquo;Now tell me how a ruler and a watch are alike&rdquo;.','En','2014-11-24 15:02:16')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('112','AbstractionExecutionInstructionsText','<p>The examiner asks the subject to explain what each pair of words has in common, starting with the example:</p> <blockquote>&nbsp;&ldquo;Tell me how an orange and a banana are alike.&rdquo;</blockquote> <p>If the subject answers in a concrete manner, then say only one additional time:</p> <blockquote>&ldquo;Tell me another way in which those items are alike.&rdquo;</blockquote> <p>If the subject does not give the appropriate response (fruit), say,</p> <blockquote>&nbsp;&ldquo;Yes, and they are also both fruit.&rdquo;</blockquote> <p>Do not give any additional instructions or clarification.&nbsp;</p> ','En','2014-11-24 15:02:29')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('113','AbstractionExecutionScoringText','<p><strong>The following responses are acceptable:</strong></p> <ul> <li>Train-bicycle = means of transportation, means of travelling, you take trips in both;</li> <li>Ruler-watch = measuring instruments, used to measure.</li> </ul> <p><strong>The following responses are not acceptable:</strong></p> <ul> <li>Train-bicycle = they have wheels; Ruler-watch = they have numbers.</li> </ul> ','En','2014-11-24 15:02:54')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('114','DelayedRecallTitle','Delayed recall ','En','2014-11-24 15:11:03')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('115','DelayedRecallText','The examiner gives the following instruction: <blockquote>&nbsp;&ldquo;I read some words to you earlier, which I asked you to remember. Tell me as many of those words as you can remember.&rdquo;</blockquote> ','En','2014-11-24 11:41:07')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('116','HasToRecallWords','Has to recall words','En','2014-11-24 11:41:32')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('117','WithNoCue','With no cue','En','2014-11-25 10:22:00')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('118','PartOfTheBody','part of the body','En','2014-11-24 11:42:15')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('119','CategoryCue','Category cue','En','2014-11-24 11:41:43')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('120','TypeOfFabric','type of fabric','En','2014-11-24 11:42:31')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('121','Colour','a colour','En','2014-11-24 11:42:54')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('122','TypeOfFlower','type of flower','En','2014-11-24 11:26:48')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('123','TypeOfBuilding','type of building','En','2014-11-24 11:27:03')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('124','MultipleChoiceCue','Multiple choice cue','En','2014-11-24 11:41:55')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('125','NoseFaceHand','nose, face, hand','En','2014-11-24 11:43:10')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('126','DenimCottonVelvet','denim, cotton, velvet','En','2014-11-24 11:43:22')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('127','Start','Start','En','2014-11-25 10:21:42')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('128','ChurchSchoolHospital','church, school, hospital','En','2014-11-24 11:43:33')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('129','RoseDaisyTulip','rose, daisy, tulip','En','2014-11-24 11:43:44')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('130','RedBlueGreen','red, blue, green','En','2014-11-24 11:43:55')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('131','DelayedRecallInstructionsText','<p>Prompt the subject with the&nbsp;<strong>semantic category cue</strong>provided below for any word not recalled.</p> <p>FACE: part of the body</p> <p>VELVET: type of fabric</p> <p>CHURCH: type of building</p> <p>DAISY: type of flower</p> <p>RED: a colour</p> <p>Make a check mark ( &radic; ) in the allocated space if the subject remembered the word with the help of a category cue.</p> <p>Prompt the subject with the&nbsp;<strong>multiple choice cue</strong>&nbsp;provided below for any word not recalled.</p> <p>FACE: nose, face, hand</p> <p>VELVET: denim, cotton, velvet</p> <p>CHURCH: church, school, hospital</p> <p>DAISY: rose, daisy, tulip</p> <p>RED: red, blue, green</p> <p>Make a check mark (&radic;) in the allocated space if the subject remembered the word with the help of a multiple choice cue.</p> ','En','2014-11-24 11:41:16')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('132','OrientationTitle','Orientation','En','2014-11-24 17:10:54')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('133','OrientationText1','<p>Please put a check mark for each correct item.</p> ','En','2014-11-24 11:57:33')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('134','Date','Date','En','2014-11-25 10:21:26')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('135','Month','Month','En','2014-11-24 11:50:14')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('136','Year','Year','En','2014-11-24 11:50:41')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('137','Day','Day','En','2014-11-24 12:03:40')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('138','Place','Place','En','2014-11-24 11:51:47')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('139','City','City','En','2014-11-24 11:52:18')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('140','OrientationScoringText','Give one point for each item correctly answered. The subject must tell the exact date and the exact place (name of hospital, clinic, office). No points are allocated if subject makes an error of one day for the day and date.','En','2014-11-24 12:04:04')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('141','OrientationText2','<em>&ldquo;Tell me the date today&rdquo;</em>','En','2014-11-24 11:58:40')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('142','ResetConfirmation','Reset confirmation','En','2014-11-24 11:59:01')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('143','OrientationText3','If the subject does not give a complete answer, then prompt accordingly by saying:','En','2014-11-24 12:03:26')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('144','OrientationText4','<em>&ldquo;Tell me the [year, month, exact date, and day of the week].&rdquo;</em>','En','2014-11-24 12:00:56')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('145','OrientationText5','Then say:','En','2014-11-24 12:01:41')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('146','OrientationText6','<em>&ldquo;Now, tell me the name of this place, and which city it is in.&rdquo;</em>','En','2014-11-24 12:02:26')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('149','Administration','Administration','En','2014-11-24 12:40:29')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('150','Tests','Tests','En','2014-11-25 10:21:09')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('151','Columns','Columns','En','2014-11-24 12:59:09')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('152','Patient','Patient','En','2014-11-25 10:20:40')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('153','Result','Result','En','2014-11-24 12:57:38')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('154','Email','Email','En','2014-11-25 10:20:17')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('155','SendByEmail','Send by email','En','2014-11-24 13:02:23')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('156','StartTest','Start test ','En','2014-11-24 13:59:30')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('157','Repeat','Repeat','En','2014-11-24 14:41:09')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('158','MontrealCognitiveAssessment','Montreal cognitive assessment (MoCA) ','En','2014-11-24 18:17:56')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('159','Sex','Sex','En','2014-11-24 15:34:00')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('160','Version','Version 8.1 Electronic','En','2014-11-24 15:42:59')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('161','Visuospatial','Visuospatial / Executive','En','2014-11-25 10:19:53')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('162','Points','Points','En','2014-11-25 10:19:36')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('163','3points','(3 points)','En','2014-11-25 10:19:12')",
    //    "INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('164','ResultMemoryText','Read list of words, subject must repeat them. <br />Do 2 trials, even if 1<sup style=\"font-size: 75%;line-height: 0;position: relative;vertical-align: baseline;top: -0.5em;\">st</sup> trial is successful. <br />Do a recall after 5 minutes.','En','2014-11-24 16:02:44')",
    //"INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('166','CopyCube2','Copy<br /> Cube','En','2014-11-24 16:09:04')",
    //"INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('167','ResultAttentionText1','Read list of digits (1 digit/sec.).','En','2014-11-24 16:15:37')",
    //"INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('168','ResultAttentionText2','Subject has to repeat them in the forward order<br /> Subject has to repeat them in the backward order','En','2014-11-24 16:18:44')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('169','Attention','Attention','En','2014-11-24 16:17:57')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('170','ResultAttentionText3','Read list of letters. The subject must tap with his hand at each letter A. No points if &ge; 2 errors','En','2014-11-24 16:29:09')",
    //"INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('171','ResultAttentionText4','4 of 5 correct subtractions: <span style=\"font-weight: 700;font-size:1.1em;\">3 pts</span>, 2 or 3 correct: <span style=\"font-weight: 700;font-size:1.1em;\">2 pts</span>, 1 correct: <span style=\"font-weight: 700;font-size:1.1em;\">1 pt</span>, 0 correct: <span style=\"font-weight: 700;font-size:1.1em;\">0 pt</span>','En','2014-11-24 16:24:17')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('172','Language','Language','En','2014-11-24 16:26:18')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('173','ResultFluencyText','Fluency / Name maximum number of words in one minute that begin with the letter F.','En','2014-11-24 16:37:13')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('174','ResultAbsrtactionText1','Similarity between e.g. banana - orange = fuit','En','2014-11-24 16:42:23')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('175','TrainBicycle','train-bicycle','En','2014-11-24 16:42:42')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('176','WatchRuler','watch-ruler','En','2014-11-24 16:46:10')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('177','MIS','MIS','En','2014-11-24 17:03:44')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('178','PointsForUncued','Points for<br />UNCUED<br />recall only','En','2014-11-24 17:00:27')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('179','NormalMoreResult','Normal&nbsp;&ge;&nbsp;','En','2014-11-24 17:20:53')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('180','AddPointResult','Add 1 point if &le;12 yr edu','En','2014-11-24 17:22:36')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('181','TotalTime','Total time','En','2014-11-24 17:24:01')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('182','Total','Total','En','2014-11-24 17:24:13')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('183','Comments','Comments','En','2014-11-24 17:25:22')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('184','General','General','En','2014-11-24 17:27:43')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('185','Back','Back','En','2014-11-24 18:16:13')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('186','Resources','Resources','En','2014-11-25 09:53:04')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('187','NoPoints','No<br /> points','En','2014-11-25 11:14:09')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('1090','UpdateResources','Update Resources','En','2014-11-25 13:31:43')","INSERT into MocaResources(Id,Name,Value,Language,UpdateDate) values('1091','UpdateComplete','Update complete','En','2014-11-26 08:18:20')"];
    //for (var i = 0; i < insertedData.length; i++) {
    //    ExecuteSql(insertedData[i]);
    //}
    postMessage({ queryResult: "1" });
    ////////////////////////

 
    function ExecuteSql(sql) {
        var rs;
        wdb.transaction(function (tx) {
            rs = tx.executeSql(sql, []);
        });
        return rs;
    }
 
}, false);
 
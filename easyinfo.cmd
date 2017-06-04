@echo off
where /q electron
IF ERRORLEVEL 0 (
	echo Starting EasyInfo using electron
	electron .
	pause
) ELSE (
	where /q npm
	IF ERRORLEVEL 0 (
		echo Starting EasyInfo using npm
		npm start
		pause
	) ELSE (		
		echo Neither electron nor npm could be found. Please ensure they are on the path
		pause
	)
)

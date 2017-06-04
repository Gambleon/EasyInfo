@echo off
cd ..
where /q npm
IF ERRORLEVEL 0 (
	echo Installing electron using npm
	npm install electron
) ELSE (
	echo npm could be found. Please ensure it is on the path
)
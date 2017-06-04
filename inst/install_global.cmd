@echo off
cd ..
where /q npm
IF ERRORLEVEL 0 (
	echo Installing electron globally using npm
	npm install -g electron
) ELSE (
	echo npm could be found. Please ensure it is on the path
)

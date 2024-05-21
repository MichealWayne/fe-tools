#!/bin/sh

VERSION=""
AUTHOR=""

# get parameters
while getopts "V:U:" arg
do
    case $arg in
         V)
            VERSION=$OPTARG
            ;;
         U)
            AUTHOR=$OPTARG
            ;;
         ?)
        echo "Unknown parameter"
    exit 1
    ;;
    esac
done

# run build.js
if [ ! -f "build.js" ];then
    echo "no build.js"
else
    echo "Run build.js"
    node "build"
fi


cd "../"

cp "README.md" "./dist/"

# builder version folder
mkdir -p "./versions/$VERSION"

cp -r "./package.json" "./versions/$VERSION/"
cp -r "./README.md" "./versions/$VERSION/"
cp -r "./src" "./versions/$VERSION/"
cp -r "./dist" "./versions/$VERSION/"

echo "operator: $AUTHOR"

echo -e "\033[44;37m Build success! \033[0m"
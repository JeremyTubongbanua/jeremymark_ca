#!/bin/bash

# Loop through each gallery folder within the projects directory
for gallery_dir in ./public/assets/projects/*/gallery; do
    # Check if the directory exists
    if [ -d "$gallery_dir" ]; then
        # Initialize the JSON array
        json_array="["
        
        # Find all image files with extensions png, jpg, jpeg in the current gallery directory
        images=$(find "$gallery_dir" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -exec basename {} \;)
        
        # Loop through each image file and append it to the JSON array
        first=true
        for image in $images; do
            if [ "$first" = true ]; then
                first=false
            else
                json_array+=", "
            fi
            json_array+="\"$image\""
        done
        
        # Close the JSON array
        json_array+="]"
        
        # Write the JSON array to gallery.json in the current gallery folder
        echo "$json_array" > "$gallery_dir/gallery.json"
    fi
done
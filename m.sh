#!/bin/bash

for gallery_dir in ./public/assets/projects/*/gallery; do
    if [ -d "$gallery_dir" ]; then
        json_array="["
        
        images=$(find "$gallery_dir" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -exec basename {} \;)
        
        first=true
        for image in $images; do
            if [ "$first" = true ]; then
                first=false
            else
                json_array+=", "
            fi
            json_array+="\"$image\""
        done
        
        json_array+="]"
        
        echo "$json_array" > "$gallery_dir/gallery.json"
    fi
done

for gallery_dir in ./public/assets/experiences/*/gallery; do
    if [ -d "$gallery_dir" ]; then
        json_array="["
        
        images=$(find "$gallery_dir" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -exec basename {} \;)
        
        first=true
        for image in $images; do
            if [ "$first" = true ]; then
                first=false
            else
                json_array+=", "
            fi
            json_array+="\"$image\""
        done
        
        json_array+="]"
        
        echo "$json_array" > "$gallery_dir/gallery.json"
    fi
done
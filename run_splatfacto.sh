#!/bin/bash

IMAGE_DIR="images/"            
DATABASE_FILE="database.db"     
SPARSE_OUTPUT_DIR="sparse/"     
NERFSTUDIO_DATA_DIR="processed_data/"

mkdir -p $SPARSE_OUTPUT_DIR
mkdir -p $NERFSTUDIO_DATA_DIR

echo "Running COLMAP Feature Extraction..."
colmap feature_extractor --database_path $DATABASE_FILE --image_path $IMAGE_DIR

echo "Running COLMAP Exhaustive Matcher..."
colmap exhaustive_matcher --database_path $DATABASE_FILE

echo "Running COLMAP Mapper..."
colmap mapper --database_path $DATABASE_FILE --image_path $IMAGE_DIR --output_path $SPARSE_OUTPUT_DIR

echo "Converting COLMAP data to Nerfstudio format..."
ns-process-data colmap --data $IMAGE_DIR --output-dir $NERFSTUDIO_DATA_DIR

echo "Training Gaussian Splatting with Nerfstudio..."
ns-train splatfacto --data $NERFSTUDIO_DATA_DIR

echo "Done! Check your training outputs."
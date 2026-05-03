# Parasitic Skin Disease Classifier

## Table of Contents

- [Overview](#overview)
- [Purpose](#purpose)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Dataset Preparation](#dataset-preparation)
- [Training the Model](#training-the-model)
- [Running Predictions](#running-predictions)
- [Frontend Integration](#frontend-integration)
- [Model Details](#model-details)
- [Medical Guidance](#medical-guidance)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)
- [Contact](#contact)

## Overview

This project implements a comprehensive machine learning system for classifying parasitic skin diseases using a fine-tuned MobileNetV2 model. It combines deep learning for image classification with a web-based interface for real-time predictions, supporting both standalone inference and API-based deployment. The system is designed for educational, research, or preliminary screening purposes, emphasizing safety with non-diagnostic guidance.

## Purpose

The primary goal is to assist in identifying common parasitic skin conditions from images, providing users with:
- Accurate classification into 5 categories
- Confidence scores for predictions
- General, non-prescriptive medical guidance sourced from reliable references (CDC, Merck)
- A user-friendly web interface for easy access

**Important**: This is not a medical diagnostic tool. Predictions are probabilistic and should not replace professional medical consultation.

## Features

- **Deep Learning Model**: MobileNetV2 fine-tuned for skin disease classification
- **Classification Categories**:
  - None (uncertain result)
  - NormalSkin
  - PA-cutaneous-larva-migrans (Cutaneous Larva Migrans)
  - Scabies
  - Tinea (Ringworm)
- **FastAPI Backend**: RESTful API for predictions with CORS support for frontend integration
- **React Frontend**: Web-based UI for image upload and results display
- **Federated Learning Support**: Client-side training for privacy-preserving model updates
- **Standalone Prediction**: Command-line tool for testing individual images
- **Medical Guidance**: Provides general solutions and prevention tips based on predictions

## Project Structure

```
Parastic_Skin_Disease/
├── main.py                 # FastAPI server for predictions
├── model_builder.py        # Model architecture definition
├── dataloader.py           # Data loading and preprocessing
├── utils.py                # Utility functions for model management
├── client_train.py         # Local training script (federated learning)
├── Predict.py              # Standalone prediction tool
├── parasitic_local.pth     # Trained model checkpoint
├── Parastic-Dataset/       # Image dataset
│   ├── Train/              # Training images
│   └── Test/               # Testing images
├── checkpoints/            # Saved model checkpoints
├── myenv/                  # Virtual environment
├── newenv/                 # Alternative virtual environment
├── __pycache__/            # Python bytecode
└── README.md               # This file
```

## Installation

### Prerequisites
- Python 3.8+
- pip
- Virtual environment (recommended)

### Setup Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd path/to/Parastic_Skin_Disease
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv myenv
   # Windows
   myenv\Scripts\activate
   # Linux/Mac
   source myenv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install torch torchvision fastapi uvicorn python-multipart pillow
   ```
   - `torch` and `torchvision`: For PyTorch and computer vision utilities
   - `fastapi`: Web framework for the API
   - `uvicorn`: ASGI server for running FastAPI
   - `python-multipart`: For handling file uploads
   - `pillow`: Image processing

## Dataset Preparation

The system expects images organized in a specific folder structure using `torchvision.datasets.ImageFolder`:

```
Parastic-Dataset/
├── Train/
│   ├── None/               # Images with uncertain results
│   ├── NormalSkin/         # Healthy skin images
│   ├── PA-cutaneous-larva-migrans/  # CLM images
│   ├── Scabies/            # Scabies images
│   └── Tinea/              # Tinea/ringworm images
└── Test/
    ├── None/
    ├── NormalSkin/
    ├── PA-cutaneous-larva-migrans/
    ├── Scabies/
    └── Tinea/
```

- **Image Requirements**: RGB images (automatically converted); will be resized to 224x224
- **Data Split**: Train/Test folders for supervised learning
- **Preprocessing**: Normalization using ImageNet mean/std values

## Training the Model

### Local Training

Run the client-side training script:

```bash
python client_train.py
```

This will:
- Load the dataset from `Parastic-Dataset/`
- Build and train a MobileNetV2 model for 10 epochs
- Use Adam optimizer with learning rate 3e-4
- Save the trained model to `checkpoints/parasitic_local.pth`

### Training Parameters
- Batch size: 16
- Learning rate: 3e-4
- Epochs: 10
- Loss: Cross-Entropy
- Device: CUDA if available, else CPU

### Federated Learning Context
The `client_train.py` is designed for federated learning scenarios where:
- Clients train locally on their data
- Updated parameters can be shared with a central server
- Privacy is preserved by not sharing raw data

## Running Predictions

### API Server

Start the FastAPI server:

```bash
python main.py
```

The server will run on `http://localhost:8000` (or the next available port).

#### API Endpoints

- **GET /health**
  - Returns server status, device info, and model load status
  - Response: `{"ok": true, "device": "cuda", "model_loaded": true}`

- **POST /predict**
  - Accepts image file upload
  - Returns prediction with confidence and guidance
  - Request: Multipart form with `file` field (image)
  - Response:
    ```json
    {
      "label": "Scabies",
      "confidence": 0.87,
      "solution": {
        "title": "Scabies (general guidance)",
        "solutions": ["See a clinician for diagnosis..."]
      },
      "raw": {
        "filename": "skin_image.jpg",
        "content_type": "image/jpeg"
      }
    }
    ```

### Standalone Prediction

For testing individual images:

```bash
python Predict.py
```

This loads the model and predicts on `normal1.jpeg` (hardcoded). Modify the script for other images.

## Frontend Integration

The project includes a React-based frontend in the sibling `../frontend/` directory.

### Running the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

This starts the development server (typically on `http://localhost:5173`).

The frontend:
- Allows users to upload images
- Sends requests to the `/predict` endpoint
- Displays results with confidence scores and guidance

## Model Details

### Architecture
- **Base Model**: MobileNetV2 pre-trained on ImageNet
- **Modifications**: Final classifier replaced with 5-class linear layer
- **Input Size**: 224x224 RGB images
- **Output**: Logits for 5 classes

### Preprocessing
- Resize to 224x224
- Convert to tensor
- Normalize: mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]

### Training Details
- Optimizer: Adam with weight decay 1e-5
- Loss: Cross-Entropy Loss
- No explicit class balancing (consider using `compute_class_weights` from utils.py for imbalanced data)

## Medical Guidance

The system provides general, non-diagnostic advice based on predictions:

- **Cutaneous Larva Migrans**: Prevention tips, treatment guidance
- **Scabies**: Hygiene recommendations, treatment options
- **Tinea**: Antifungal suggestions, care instructions
- **Normal Skin**: Monitoring advice
- **None**: Suggestions for better images

**Sources**: CDC guidelines, Merck Manual, general medical references.

## Troubleshooting

### Common Issues

1. **Model not loading**: Ensure `parasitic_local.pth` exists in `checkpoints/`
2. **Dataset not found**: Verify `Parastic-Dataset/Train` and `Test` folders exist
3. **CUDA errors**: Falls back to CPU; check PyTorch CUDA installation
4. **Frontend connection**: Ensure API is running and CORS is configured

### Dependencies Check
```bash
# Linux/Mac
pip list | grep -E "(torch|fastapi|uvicorn|pillow)"
# Windows PowerShell
pip list | Select-String -Pattern "(torch|fastapi|uvicorn|pillow)"
```

### Testing the API
```bash
curl -X GET http://localhost:8000/health
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper documentation
4. Test thoroughly
5. Submit a pull request

## License

[Specify license here, e.g., MIT License]

## Disclaimer

This software is for educational and research purposes only. It does not provide medical diagnosis or treatment recommendations. Always consult qualified healthcare professionals for medical concerns. The developers are not liable for any misuse or misinterpretation of results.

## Contact

[Add contact information if applicable]

---

**Last Updated**: January 11, 2026</content>
<parameter name="filePath">c:\Users\User\Desktop\FINAL\NIK\Mobile net_trained\Mobile net_trained\Parastic_Skin_Disease\README.md
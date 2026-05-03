# Viral Skin Disease prediction

A deep learning project for detecting viral skin diseases using PyTorch. This project can classify skin conditions as Healthy, VI-chickenpox, or VI-shingles.

## Project Structure

```
my project 2/
├── viral/                          # Main package directory
│   ├── PredictModel.py            # Main prediction script
│   ├── model_builder.py           # Model architecture definition
│   ├── utils.py                   # Utility functions
│   ├── dataloader.py              # Data loading utilities
│   ├── api.py                     # API interface
│   ├── client_train.py            # Client training script
│   ├── disease_info.json          # Disease information database
│   ├── saved_viral_models/        # Trained model weights
│   └── t1.jpg                     # Sample test image
├── saved_viral_models/            # Model storage directory
├── frontend/                      # Frontend application
└── README.md                      # This file
```

## Features

- **Disease Classification**: Detects viral skin diseases including chickenpox and shingles
- **Deep Learning Model**: Built with PyTorch and torchvision
- **Pre-trained Models**: Includes trained model weights for immediate use
- **Confidence Scoring**: Provides prediction confidence percentages
- **API Support**: RESTful API for integration with other applications

## Requirements

- Python 3.7+
- PyTorch
- torchvision
- FedAvg
- PIL (Python Imaging Library)
- Flask (for API)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "my project 2"
```

2. Install required packages:
```bash
pip install torch torchvision pillow flask
```

## Usage

### Running Predictions

Run the main prediction script:

```bash
python3 -m viral.PredictModel
```

This will:
- Load the pre-trained model from `saved_viral_models/viral_skin_model_200epochs.pth`
- Make a prediction on the sample image `viral/t1.jpg`
- Output the classification result with confidence score

### Using the API

Start the API server:

```bash
python3 -m viral.api
```

The API will be available at `http://localhost:5000`

### Training

To train the model:

```bash
python3 -m viral.client_train
```

## Model Architecture

The model uses a custom architecture built with PyTorch, specifically designed for skin disease classification. It processes RGB images and outputs probabilities for three classes:

- **Healthy**: Normal skin condition
- **VI-chickenpox**: Chickenpox infection
- **VI-shingles**: Shingles infection

## Output Format

The prediction output includes:
- Disease classification
- Confidence percentage

Example output:
```
Viral (Healthy) - 100.00% confidence
```

## Model Performance

The model is trained for 200 epochs and saved as `viral_skin_model_200epochs.pth`. Performance metrics and training history can be found in the training logs.

## File Descriptions

- **PredictModel.py**: Main script for running predictions on images
- **model_builder.py**: Defines the neural network architecture
- **utils.py**: Helper functions for model operations
- **dataloader.py**: Data loading and preprocessing utilities
- **api.py**: Flask-based REST API for model serving
- **client_train.py**: Training script for the model
- **disease_info.json**: Database containing disease information and metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This tool is for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis. Always consult with qualified healthcare providers for medical concerns.

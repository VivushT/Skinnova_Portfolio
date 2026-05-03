# Fungal Skin Disease Prediction

Deep learning project for detecting common fungal skin conditions from images using PyTorch. It predicts a class label and confidence score and includes a small FastAPI service for integration. Intended for educational and research use.

## Supported classes

Class names are read from `fungal/Fungal-Dataset/Train` (folder names). Friendly labels used in this README:

- Healthy: Normal skin condition (include a `Healthy` folder in Train/Test if you want this class)
- Ringworm (Tinea Corporis): `FU-ringworm`
- Athlete’s Foot (Tinea Pedis): `FU-athlete-foot`
- Nail Fungal Disease (Onychomycosis): `FU-nail-fungus`

## Project overview

- Domain: medical image classification (fungal skin diseases)
- Framework: PyTorch + torchvision
- Model: custom CNN
- API: FastAPI (REST)

## Project structure

- `fungal/` main package directory
- `fungal/PredictModel.py` inference utilities and prediction helpers
- `fungal/model_builder.py` CNN architecture
- `fungal/utils.py` helper utilities
- `fungal/dataloader.py` dataset loading and preprocessing
- `fungal/main.py` FastAPI service
- `fungal/client_train.py` training script
- `fungal/Fungal-Dataset/` dataset directory
- `fungal/trained_model.pth` trained model weights
- `frontend/` React + Vite UI

## Requirements

- Python 3.8+
- `torch`, `torchvision`, `pillow`
- `fastapi`, `uvicorn`, `python-multipart` (for the API)

## Installation

```bash
git clone https://github.com/VivushT/SkinFlect.git
cd SkinFlect
python -m venv .venv
source .venv/bin/activate
pip install torch torchvision pillow fastapi uvicorn python-multipart
```

## Usage

Run a quick prediction (uses `fungal/sample.jpg` if present):

```bash
python -m fungal.PredictModel
```

Start the API:

```bash
uvicorn fungal.main:app --reload
```

Train the model:

```bash
python -m fungal.client_train
```

## Output format

Predictions return:

- `label` (predicted class)
- `confidence` (float 0–1)
- `topk` (top predictions with confidences)

## Notes

- The model reads class labels directly from the dataset folder names.
- `PredictModel.py` also attaches basic solution guidance for known classes.

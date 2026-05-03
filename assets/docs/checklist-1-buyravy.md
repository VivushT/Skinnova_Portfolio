# Bacterial Skin Disease Prediction

PyTorch-based image classifier for bacterial skin conditions. The model predicts common bacterial classes (Healthy, BA-Impetigo, BA-Cellulitis, BA-Ery) and returns confidence scores.

## Project layout

- `Bacterial_Skin_Disease/` Python package with the model, data loading, and API
- `Bacterial_Skin_Disease/Bacterial-Dataset/` training and test datasets
- `Bacterial_Skin_Disease/bacterial_model.pth` trained model weights
- `frontend/` React + Vite UI

## Requirements

- Python 3.8+
- `torch`, `torchvision`, `pillow`
- `fastapi`, `uvicorn`, `python-multipart` (for the API)

## Installation

Clone the repository:

```bash
git clone https://github.com/VivushT/SkinFlect.git
cd SkinFlect
```

Install Python dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r Bacterial_Skin_Disease/requirements.txt
```

## Run a local prediction

The prediction helper loads class names from `Bacterial_Skin_Disease/Bacterial-Dataset/Train`.

Quick test (uses `Bacterial_Skin_Disease/test.jpg` if present):

```bash
python -m Bacterial_Skin_Disease.PredictModel
```

Programmatic example:

```python
from Bacterial_Skin_Disease.PredictModel import predict_from_path

result = predict_from_path("/path/to/image.jpg")
print(result)
```

## Run the API

```bash
uvicorn Bacterial_Skin_Disease.api:app --reload
```

- `GET /` health check
- `POST /predict` accepts a multipart form field named `file`

## Train the model

Make sure the dataset is present:

```
Bacterial_Skin_Disease/Bacterial-Dataset/Train/
Bacterial_Skin_Disease/Bacterial-Dataset/Test/
```

Run training:

```bash
python -m Bacterial_Skin_Disease.client_train
```

The script saves weights to `Bacterial_Skin_Disease/bacterial_model.pth`.

## Frontend (optional)

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the API to be running at `http://localhost:8000`.

## File descriptions

- `Bacterial_Skin_Disease/PredictModel.py` runs inference on input images
- `Bacterial_Skin_Disease/model_builder.py` defines the CNN architecture
- `Bacterial_Skin_Disease/utils.py` helper and utility functions
- `Bacterial_Skin_Disease/dataloader.py` image loading and preprocessing
- `Bacterial_Skin_Disease/api.py` REST API (FastAPI)
- `Bacterial_Skin_Disease/client_train.py` training script
- `Bacterial_Skin_Disease/disease_info.json` bacterial disease metadata (if present)

## Notes

- The prediction threshold is set to 0.60 in `Bacterial_Skin_Disease/PredictModel.py`.
- Class labels are derived from the folder names under `Bacterial_Skin_Disease/Bacterial-Dataset/Train`.
## Supported classes

Classes are derived from the folder names under `Bacterial_Skin_Disease/Bacterial-Dataset/Train`.

- Healthy: Normal skin condition
- BA-Impetigo: Bacterial impetigo infection
- BA-Cellulitis: Bacterial cellulitis infection
- BA-Ery: Bacterial infection (erythema)

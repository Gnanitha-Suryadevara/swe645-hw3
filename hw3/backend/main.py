# Name: Gnanitha Suryadevara
# Course: SWE 645 - HW3
# Purpose: FastAPI backend with CRUD operations for student survey data

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Optional, List, Annotated
import os

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://admin:password@localhost:3306/swe645")

engine = create_engine(DATABASE_URL)


class Survey(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    firstName: str = Field(default="")
    lastName: str = Field(default="")
    streetAddress: str = Field(default="")
    city: str = Field(default="")
    state: str = Field(default="")
    zip: str = Field(default="")
    telephone: str = Field(default="")
    email: str = Field(default="")
    dateOfSurvey: str = Field(default="")
    likedMost: Optional[str] = Field(default="")
    interestedVia: Optional[str] = Field(default="")
    recommendationLikelihood: str = Field(default="Very Likely")
    raffle: Optional[str] = Field(default="")
    comments: Optional[str] = Field(default="")

app = FastAPI(title="SWE645 Survey API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def create_tables():
    SQLModel.metadata.create_all(engine)

@app.get("/")
def root():
    return {"message": "SWE645 Survey API is running"}

@app.post("/surveys", response_model=Survey)
def create_survey(survey: Survey):
    with Session(engine) as session:
        session.add(survey)
        session.commit()
        session.refresh(survey)
        return survey

@app.get("/surveys", response_model=List[Survey])
def get_surveys():
    with Session(engine) as session:
        return session.exec(select(Survey)).all()

@app.get("/surveys/{survey_id}", response_model=Survey)
def get_survey(survey_id: int):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        return survey

@app.put("/surveys/{survey_id}", response_model=Survey)
def update_survey(survey_id: int, updated: Survey):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        data = updated.model_dump(exclude_unset=True)
        for key, value in data.items():
            setattr(survey, key, value)
        session.add(survey)
        session.commit()
        session.refresh(survey)
        return survey

@app.delete("/surveys/{survey_id}")
def delete_survey(survey_id: int):
    with Session(engine) as session:
        survey = session.get(Survey, survey_id)
        if not survey:
            raise HTTPException(status_code=404, detail="Survey not found")
        session.delete(survey)
        session.commit()
        return {"message": "Survey deleted"}
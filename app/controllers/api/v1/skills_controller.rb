class Api::V1::SkillsController < ApplicationController
  before_action :set_skill, only: [:show, :update, :destroy]

  def index
    skills = Skill.all.order(start_date: :desc)
    render json: skills
  end

  def create
    skill = Skill.create!(skill_params)
    if skill 
      render json: skill
    else
      render json: skill.errors
    end
  end

  def show
  end

  def update
    if @skill.update(skill_params)
      render json: @skill
    else
      render json: @skill.errors
    end
  end

  def destroy
    @skill&.destroy
    render json: { message: 'Skill Deleted!' }
  end

  private

  def skill_params
    params.require(:skill).permit(:name, :start_date)
  end

  def set_skill
    @skill = Skill.find(params[:id])
  end
end

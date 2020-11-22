class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy]

  def index
    projects = Project.all.order(created_at: :desc)
    render json: projects
  end

  def create
    project = Project.create!(project_params)

    if project
      render json: project
    else
      render json: project.errors
    end
  end

  def update
  end

  def show
    if @project
      render json: @project
    else
      render json: @project.errors
    end
  end

  def destroy
    @project&.destroy
    render json: { message: 'Project Deleted!' }
  end

  private

  def project_params
    params.permit(:name, :description, :repo_url, :status)
  end

  def set_project
    @project = Project.find(params[:id])
  end
end

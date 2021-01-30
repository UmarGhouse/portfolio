class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :update, :destroy, :get_screenshots, :make_screenshot_featured]

  def index
    projects = Project.all.order(created_at: :desc)
    render json: projects
  end

  def create
    params = { name: project_params[:name], description: project_params[:description], repo_url: project_params[:repo_url], status: project_params[:status] }
    screenshots = project_params[:screenshots].map { |screenshot_param| screenshot_param[:signed_blob_id] }

    project = Project.create!(params)

    project.screenshots.attach(screenshots)

    if project
      render json: project
    else
      render json: project.errors
    end
  end

  def update
    params = { name: project_params[:name], description: project_params[:description], repo_url: project_params[:repo_url], status: project_params[:status] }
    screenshots = project_params[:screenshots].map { |screenshot_param| screenshot_param[:signed_blob_id] }

    @project.update(params)

    if @project.screenshots.attach(screenshots)
      render json: @project
    else
      render json: @project.errors
    end
  end

  def show
    screenshots = []
    
    @project.screenshots.map do |screenshot| 
      screenshots.push({ id: screenshot.id, url: screenshot.service_url, filename: screenshot.filename.to_s, featured: screenshot.featured })
    end

    if @project
      render json: @project.as_json.merge({ screenshots: screenshots })
    else
      render json: @project.errors
    end
  end

  def get_screenshots
    screenshots = []
    
    @project.screenshots.map do |screenshot| 
      screenshots.push({ id: screenshot.id, url: screenshot.service_url, filename: screenshot.filename.to_s, featured: screenshot.featured })
    end

    if screenshots
      render json: screenshots
    else
      render json: screenshots.errors
    end
  end

  def make_screenshot_featured
    # First we reset all current screenshots to non-featured
    screenshots = @project.screenshots
    screenshots.update_all(featured: false)

    # then we find the screenshot we want to make featured
    screenshot = screenshots.find(params[:attachment_id])

    # Then we update it and render a response
    if screenshot.update(featured: true)
      render json: { message: "#{screenshot.filename.to_s} set as featured image successfully." }
    else
      render json: screenshot.errors
    end
  end

  def remove_screenshot
    screenshot = ActiveStorage::Attachment.find(params[:attachment_id])

    if screenshot.purge
      render json: { message: "#{screenshot.filename.to_s} deleted" }
    else
      render json: screenshot.errors
    end
  end

  def destroy
    @project&.destroy
    render json: { message: 'Project Deleted!' }
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :repo_url, :status, screenshots: [:signed_blob_id, :filename])
  end

  def set_project
    @project = Project.with_attached_screenshots.find(params[:id])
  end
end

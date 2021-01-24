Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Project routes
      get 'projects/index'
      post 'projects/create'
      put 'projects/update/:id', to: 'projects#update', as: 'projects_update'
      get 'projects/show/:id', to: 'projects#show', as: 'projects_show'
      delete 'projects/screenshots/destroy/:attachment_id', to: 'projects#remove_screenshot', as: 'projects_remove_screenshot'
      delete 'projects/destroy/:id', to: 'projects#destroy', as: 'projects_destroy'

      # Skill routes
      get 'skills/index'
      post 'skills/create'
      get 'skills/show/:id', to: 'skills#show', as: 'skills_show'
      put 'skills/update/:id', to: 'skills#update', as: 'skills_update'
      delete 'skills/destroy/:id', to: 'skills#destroy', as: 'skills_destroy'
    end
  end

  root 'static_pages#home'
  get '/*path' => 'static_pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

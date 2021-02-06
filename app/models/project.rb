class Project < ApplicationRecord
    validates :name, presence: true
    has_many :project_skill
    has_many :skills, through: :project_skill

    has_many_attached :screenshots

    enum status: [:private, :public], _suffix: true
end

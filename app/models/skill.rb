class Skill < ApplicationRecord
  validates :name, presence: true

  has_many :project_skill
  has_many :projects, through: :project_skill
end

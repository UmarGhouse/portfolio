class Project < ApplicationRecord
    validates :name, presence: true
    enum status: [:private, :public], _suffix: true
end

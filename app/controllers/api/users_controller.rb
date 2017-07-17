class Api::UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
      # 422: unprocessable entity
      
    end
  end

  private
  def user_params
    params.require(:permit).permit(:username, :password)
  end

end

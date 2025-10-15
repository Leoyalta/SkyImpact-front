import { Injectable } from '@angular/core';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  handleError(error: any): ApiResponse<null> {
    const errorResponse: ApiResponse<null> = {
      success: false,
      message: this.getErrorMessage(error),
      timestamp: new Date().toISOString()
    };

    // Log error for debugging
    console.error('API Error:', error);

    return errorResponse;
  }

  handleSuccess<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message: message || 'Operación exitosa',
      timestamp: new Date().toISOString()
    };
  }

  private getErrorMessage(error: any): string {
    if (error?.message) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    return 'Ha ocurrido un error inesperado';
  }
}
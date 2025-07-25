import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', async () => {
    const mockCredentials = { email: 'user@example.com', password: 'password123' };
    const mockResponse = { message: 'Login successful' };

    const promise = service.loginUser(mockCredentials);
    const req = httpMock.expectOne('https://music.fly.dev/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    const result = await promise;
    expect(result).toEqual(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});

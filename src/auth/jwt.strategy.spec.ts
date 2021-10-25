import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should return the payload for complete auth scopes', () => {
    const mockPayload = {
      body: 'email openid profile',
    };
    const done = jest.fn();
    jwtStrategy.validate(mockPayload, done);
    expect(done).toHaveBeenCalled();
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null, mockPayload);
  });
  it('should throw without payload', () => {
    const mockPayload = undefined;
    const done = jest.fn();
    jwtStrategy.validate(mockPayload, done);
    expect(done).toHaveBeenCalled();
    expect(done).toHaveBeenCalledWith(new UnauthorizedException(), false);
  });
});

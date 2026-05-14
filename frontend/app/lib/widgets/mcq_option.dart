import 'package:flutter/material.dart';
import '../config/theme.dart';

enum OptionState { resting, selected, correct, incorrect }

class McqOption extends StatelessWidget {
  final String letter;
  final String text;
  final OptionState state;
  final VoidCallback? onTap;

  const McqOption({
    super.key,
    required this.letter,
    required this.text,
    required this.state,
    this.onTap,
  });

  Color _bg(BuildContext ctx) => switch (state) {
    OptionState.resting   => AppTheme.cardOf(ctx),
    OptionState.selected  => AppTheme.brandLightOf(ctx),
    OptionState.correct   => AppTheme.successBgOf(ctx),
    OptionState.incorrect => AppTheme.errorBgOf(ctx),
  };

  Color _border(BuildContext ctx) => switch (state) {
    OptionState.resting   => AppTheme.borderOf(ctx),
    OptionState.selected  => AppTheme.brand,
    OptionState.correct   => AppTheme.successBorderOf(ctx),
    OptionState.incorrect => AppTheme.errorBorderOf(ctx),
  };

  Color _chipBg(BuildContext ctx) => switch (state) {
    OptionState.resting   => AppTheme.surfaceOf(ctx),
    OptionState.selected  => AppTheme.brand,
    OptionState.correct   => AppTheme.successFgOf(ctx),
    OptionState.incorrect => AppTheme.errorFgOf(ctx),
  };

  Color _chipText(BuildContext ctx) => switch (state) {
    OptionState.resting   => AppTheme.textMutedOf(ctx),
    OptionState.selected  => Colors.white,
    OptionState.correct   => Colors.white,
    OptionState.incorrect => Colors.white,
  };

  Color _textColor(BuildContext ctx) => switch (state) {
    OptionState.correct   => AppTheme.successFgOf(ctx),
    OptionState.incorrect => AppTheme.errorFgOf(ctx),
    _                     => AppTheme.textOf(ctx),
  };

  @override
  Widget build(BuildContext context) {
    final radius = BorderRadius.circular(AppTheme.radiusButton);
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color:        _bg(context),
        border:       Border.all(color: _border(context), width: 1.5),
        borderRadius: radius,
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius:   radius,
          splashColor:    AppTheme.brandLightOf(context),
          highlightColor: AppTheme.brandLightOf(context).withValues(alpha: 0.5),
          onTap:          onTap,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            child: Row(
              children: [
                Container(
                  width:  28,
                  height: 28,
                  decoration: BoxDecoration(
                    color:        _chipBg(context),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    letter,
                    style: TextStyle(
                      fontSize:   13,
                      fontWeight: FontWeight.w600,
                      color:      _chipText(context),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    text,
                    style: TextStyle(
                      fontSize:   15,
                      fontWeight: FontWeight.w500,
                      color:      _textColor(context),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
